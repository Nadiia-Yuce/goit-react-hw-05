import css from "./MovieInfo.module.css";

export default function MovieInfo({ movie }) {
  const getYear = () => {
    const year = new Date(movie.release_date).getFullYear();
    return movie.release_date ? year : "???";
  };

  return (
    <div className={css.detailsContainer}>
      {movie.poster_path ? (
        <img
          className={css.infoPoster}
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <img
          className={css.infoPoster}
          src="https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg"
          alt="no poster"
        />
      )}
      <div>
        <h2 className={css.infoTitle}>{`${movie.title} (${getYear()})`}</h2>
        <ul>
          <li className={css.infoItem}>
            <span className={css.accent}>Date of release: </span>
            {movie.release_date}
          </li>
          <li className={css.infoItem}>
            <span className={css.accent}>Rating: </span>
            {movie.vote_average.toFixed(1)} ⭐️
          </li>
          <li className={css.infoItem}>
            <span className={css.accent}>Runtime:</span> {movie.runtime} min
          </li>
          {/* {movie.overview && <li className={css.infoItem}>Overview:</li>} */}
          {movie.overview ? (
            <li className={css.infoItem}>
              <span className={css.accent}>Overview: </span> <br />
              {movie.overview}
            </li>
          ) : (
            <li className={css.infoItem}>Overview is not found</li>
          )}
          {movie.genres.length > 0 ? (
            <li className={css.infoItem}>
              <span className={css.accent}>Genres: </span>
              {movie.genres.map(genre => genre.name).join(", ")}
            </li>
          ) : (
            <li className={css.infoItem}>Genres is not found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
