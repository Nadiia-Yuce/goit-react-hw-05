import css from "./MovieInfo.module.css";

export default function MovieInfo({ movie }) {
  return (
    <div className={css.detailsContainer}>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <div>
        <h2>{`${movie.title} (${new Date(
          movie.release_date
        ).getFullYear()})`}</h2>
        <p>Date of release: {movie.release_date}</p>
        <p>Rating: {movie.vote_average.toFixed(1)} ⭐️</p>
        <p>Overview:</p>
        <p>{movie.overview}</p>
        <p>Genres: {movie.genres.map(genre => genre.name).join(", ")}</p>
      </div>
    </div>
  );
}
