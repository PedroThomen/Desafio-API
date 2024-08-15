import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './TodoList.module.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>PESQUISE O PAIS</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a country"
      />
      <ul className={styles.countryList}>
        {countries
          .filter((country) =>
            country.name?.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((country) => (
            <li key={country.cca3} className={styles.countryItem}>
              <img
                src={country.flags?.svg}
                alt={`Flag of ${country.name?.common}`}
                className={styles.flag}
              />
              {country.name?.common}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
