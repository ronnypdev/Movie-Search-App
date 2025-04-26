import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';

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
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const endpoint = `${API_BASE_URL}?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movie data');
      }

      const data = await response.json();

      if (data.Response === 'False') {
        setError(data.Error || 'Failed to fetch movies');
        setMoviesList([]);
        return;
      }
      setMoviesList(data.results || []);
    } catch (error) {
      console.error(`Error fetching movies: ${error.message}`);
      setError('Error fetching movies. Please try again later. ');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

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
          <h2 className="mt-[40px]">All movies</h2>

          {isLoading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <ul>
              {moviesList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
