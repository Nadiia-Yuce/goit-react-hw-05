import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FallingLines } from "react-loader-spinner";
import { getMoviesByQuery } from "../../TMBD-API";
import SearchForm from "../../components/SearchForm/SearchForm";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";
// import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(999);

  const query = searchParams.get("query") ?? "";
  // const page = searchParams.get("page");
  // console.log(page);
  // console.log(query);

  useEffect(() => {
    if (!query) {
      return;
    }
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);

        const data = await getMoviesByQuery(query);
        setMovies(data.results);
        // setMovies(prevCollection => [...prevCollection, ...data.results]);
        // setTotalPages(data.total_pages);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [query]);

  // const handleLoadMore = () => {
  //   setLoading(true);
  // setPage(prevPage => prevPage + 1);
  // };

  // useEffect(() => {
  //   if (query) {
  //     setMovies([]);
  //     setPage(1);
  //   }
  // }, [query]);

  return (
    <div>
      <SearchForm />
      {loading && <FallingLines />}
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />}
      {/* {!loading && movies.length > 0 && <LoadMoreBtn onLoad={handleLoadMore} />} */}
    </div>
  );
}
