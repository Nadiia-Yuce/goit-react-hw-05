import css from "./MovieInfo.module.css";

export default function MovieInfo({ movie }) {
  console.log(movie);

  const getYear = () => {
    const year = new Date(movie.release_date).getFullYear();
    return movie.release_date ? year : "???";
  };
  // console.log(year);

  return (
    <div className={css.detailsContainer}>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <img
          src="https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg"
          alt="no poster"
        />
      )}
      <div>
        <h2>{`${movie.title} (${getYear()})`}</h2>
        <p>Date of release: {movie.release_date}</p>
        <p>Rating: {movie.vote_average.toFixed(1)} ⭐️</p>
        <p>Runtime: {`${movie.runtime} min`}</p>
        <p>Overview:</p>
        <p>{movie.overview}</p>
        <p>Genres: {movie.genres.map(genre => genre.name).join(", ")}</p>
      </div>
    </div>
  );
}
