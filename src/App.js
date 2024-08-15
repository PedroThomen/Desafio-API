import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './TodoList.module.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PESQUISE O PAIS</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a country"
        className={styles.searchInput}
      />
      <ul className={styles.countryList}>
        {countries
          .filter((country) =>
            country.name?.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((country) => (
            <li
              key={country.cca3}
              className={styles.countryItem}
              onClick={() => handleCountryClick(country)}
            >
              <img
                src={country.flags?.svg || country.flags?.png || ''}
                alt={`Flag of ${country.name?.common}`}
                className={styles.flag}
              />
              {country.name?.common}
            </li>
          ))}
      </ul>

      {selectedCountry && (
        <div className={styles.countryDetails}>
          <h2>{selectedCountry.name?.common}</h2>
          <img
            src={selectedCountry.flags?.svg || selectedCountry.flags?.png || ''}
            alt={`Flag of ${selectedCountry.name?.common}`}
            className={styles.flagLarge}
          />
          <div className={styles.detailGroup}>
            <p><strong>Official Name:</strong> {selectedCountry.name?.official}</p>
            <p><strong>Capital:</strong> {selectedCountry.capital?.[0]}</p>
            <p><strong>Region:</strong> {selectedCountry.region}</p>
            <p><strong>Subregion:</strong> {selectedCountry.subregion}</p>
            <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
            <p><strong>Area:</strong> {selectedCountry.area.toLocaleString()} km²</p>
            <p><strong>Languages:</strong> {Object.values(selectedCountry.languages || {}).join(', ')}</p>
            <p><strong>Currencies:</strong> {Object.values(selectedCountry.currencies || {}).map(currency => currency.name).join(', ')}</p>
            <p><strong>Borders:</strong> {selectedCountry.borders?.join(', ') || 'None'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
