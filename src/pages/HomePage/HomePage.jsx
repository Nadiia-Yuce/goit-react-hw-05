import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { getMovies } from "../../TMBD-API";
import MovieList from "../../components/MovieList/MovieList";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        const data = await getMovies();
        setMovies(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      {loading && <FallingLines color="#419540" />}
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
