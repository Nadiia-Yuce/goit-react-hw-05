import { Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { FallingLines } from "react-loader-spinner";
import { getMoviesById } from "../../TMBD-API";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
// import css from "./MovieDetailsPage.module.css";
import MovieInfo from "../../components/MovieInfo/MovieInfo";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLink = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        if (!movieId) {
          return;
        }
        const data = await getMoviesById(movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [movieId]);

  return (
    <div>
      {loading && <FallingLines />}
      {error && <ErrorMessage />}
      <Link to={backLink.current}>Go back</Link>
      {movie !== null && <MovieInfo movie={movie} />}

      <p>Additional information:</p>
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>

      <Suspense fallback={<FallingLines />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
