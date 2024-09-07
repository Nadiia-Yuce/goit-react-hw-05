import MovieCard from "../MovieCard/MovieCard";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  return (
    <div>
      <ul className={css.movieList}>
        {movies.map(movie => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
}
