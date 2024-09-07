import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";
import { getMoviesByQuery } from "../../TMBD-API";
import SearchForm from "../../components/SearchForm/SearchForm";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(999);

  const query = searchParams.get("query") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (!query) {
      return;
    }
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);

        const data = await getMoviesByQuery(query, page);
        setMovies(prevCollection => [...prevCollection, ...data.results]);
        setTotalPages(data.total_pages);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [query, page]);

  const handleSubmit = query => {
    setMovies([]);
    setSearchParams({ query, page: 1 });
  };

  const handleLoadMore = () => {
    setLoading(true);
    searchParams.set("page", page + 1);
    setSearchParams(searchParams);
  };

  return (
    <div>
      <SearchForm onSubmit={handleSubmit} />
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />}
      {!loading && movies.length > 0 && <LoadMoreBtn onLoad={handleLoadMore} />}
      {loading && <FallingLines />}
      {page >= totalPages && <p>End of the collection!!</p>}
    </div>
  );
}
