import { Link, useLocation } from "react-router-dom";

export default function MovieCard({
  movie: { id, title, poster_path, release_date },
}) {
  const location = useLocation();
  const year = new Date(release_date).getFullYear();
  return (
    <div>
      <Link to={`/movies/${id}`} state={location}>
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={title}
        />
        <h2>{`${title} (${year})`}</h2>
      </Link>
    </div>
  );
}
