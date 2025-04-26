import React, { useState, useEffect } from 'react';
import Search from './components/Search';

const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (response.ok) {
        throw new Error('Failed to fetch movie data');
      }

      const data = await response.json();
      setSearchTerm(data);
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  console.log('searchTerm', searchTerm);

  if (loading) {
    return <h1>Loading Movies...</h1>;
  }

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <h1>
            <img src="./hero.png" alt="Hero" />
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className="all-movies">
          <h2>All movies</h2>

          {error && <p className="text-red-500">{error}</p>}
        </section>
      </div>
    </main>
  );
}

export default App;
