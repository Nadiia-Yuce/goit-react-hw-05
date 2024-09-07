import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../TMBD-API";
import { FallingLines } from "react-loader-spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        if (!movieId) {
          return;
        }
        const data = await getMovieReviews(movieId);
        setReviews(data);
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
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              {review.author_details.avatar_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w185${review.author_details.avatar_path}`}
                  alt="avatar"
                />
              ) : (
                <img
                  src="https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg"
                  alt="no avatar"
                />
              )}
              <p>{new Date(review.created_at).toLocaleDateString("en-CA")}</p>
              <p>{review.author}</p>
              {review.author_details.rating && (
                <p>Rating: {review.author_details.rating}/10 ⭐️</p>
              )}
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Oops... Reviews info is not found! </p>
      )}
    </div>
  );
}
