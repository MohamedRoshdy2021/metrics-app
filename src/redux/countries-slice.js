import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getCountries = createAsyncThunk('countries/getCountries', async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    const filteredData = data.filter((country) => country.name.common !== 'Israel');

    const EgyptData = {
      flags: {
        png: 'https://img.freepik.com/premium-vector/3d-realistic-pennant-with-flag_97886-2626.jpg',
      },
      name: {
        common: 'Egypt',
        official: 'State of Egypt',
      },
      region: 'Africa',
      capital: ['Cairo'],
      area: 1000.000,
      population: 105052776,
      timezones: ['UTC+02:00'],
      currencies: {
        ILS: {
          name: 'Egyptian Pound',
          symbol: 'EG',
        },
      },
      languages: {
        ara: 'Arabic',
      },
    };
    return [EgyptData, ...filteredData];
});

export const getCountry = createAsyncThunk('countries/getCountry', async (name) => {
    if (name === 'Israel') {
      return null;
    } if (name === 'Egypt') {
      const EgyptData = {
        flags: {
          png: 'https://img.freepik.com/premium-vector/3d-realistic-pennant-with-flag_97886-2626.jpg',
        },
        name: {
          common: 'Egypt',
          official: 'State of Egypt',
        },
        region: 'Africa',
        capital: ['Cairo'],
        area: 1000.000,
        population: 105052776,
        timezones: ['UTC+02:00'],
        currencies: {
          ILS: {
            name: 'Egyptian Pound',
            symbol: 'EG',
          },
        },
        languages: {
          ara: 'Arabic',
        },
      };
      return EgyptData;
    }

    const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data[0];
});


const countriesSlice = createSlice({
  name: 'countries',
  initialState: {
    countries: [],
    country: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getCountries.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        countries: action.payload,
      }))
      .addCase(getCountries.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }))
      .addCase(getCountry.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getCountry.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        country: action.payload,
      }))
      .addCase(getCountry.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});

export default countriesSlice.reducer;
