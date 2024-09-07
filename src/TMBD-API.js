import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxYjBlMWViZmIxZDM3YjIzMGEzMWZiOWIxNjQ4ZGQyMCIsIm5iZiI6MTcyNTYxMzcyMS45NjkyNTYsInN1YiI6IjY2ZGEyYjJlNGY1YjQxYjFkYWViMjkxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HzKL9B8-JEM6R8mVdiakiVg-8bJkOcPp5NoFRyVDC9A",
  },
};

export const getMovies = async () => {
  const response = await axios.get(
    "/trending/movie/week?language=en-US",
    options
  );

  return response.data.results;
};

export const getMoviesById = async movieId => {
  const response = await axios.get(`/movie/${movieId}`, options);

  return response.data;
};

export const getMovieCast = async movieId => {
  const response = await axios.get(`/movie/${movieId}/credits`, options);

  return response.data.cast;
};

export const getMovieReviews = async movieId => {
  const response = await axios.get(`/movie/${movieId}/reviews`, options);

  return response.data.results;
};

export const getMoviesByQuery = async (query, page = 1) => {
  const response = await axios.get(
    `/search/movie?query=${query}&page=${page}`,
    options
  );

  return response.data;
};
