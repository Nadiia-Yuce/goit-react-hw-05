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
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import css from "./MovieDetailsPage.module.css";
import clsx from "clsx";

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

  const getActiveClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <div className={css.container}>
      <div className={css.back}>
        <Link to={backLink.current}>Go back</Link>
      </div>
      <div>
        {loading && <FallingLines />}
        {error && <ErrorMessage />}
        {movie !== null && <MovieInfo movie={movie} />}

        {!loading && movie !== null && (
          <div>
            <p className={css.additional}>Additional information:</p>
            <ul className={css.outletList}>
              <li>
                <NavLink to="cast" className={getActiveClass}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={getActiveClass}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>

      <Suspense fallback={<FallingLines />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
