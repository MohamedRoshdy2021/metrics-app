import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/homePage.module.css';
import CountryCard from './CountryCard';
import Header from './Header';

const HomePage = ({ countries }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = countries.filter((country) => Object.values(country)
    .filter((value) => typeof value === 'string')
    .some((value) => value.toLowerCase().includes(searchTerm.toLowerCase())));

  return (
    <>
      <Header title="Countries-Metrics" />
      <section>
        <input
          type="search"
          className={styles.search}
          placeholder="Search by country name .."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />

        <ul className={styles.listContainer}>
          {filteredCountries.map((country) => (
            <CountryCard
              key={country.name.common}
              country={country}
            />
          ))}
        </ul>
      </section>
    </>
  );
};

HomePage.propTypes = {
  countries: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.shape({
        common: PropTypes.string.isRequired,
      }).isRequired,
      flags: PropTypes.shape({
        png: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};

export default HomePage;
