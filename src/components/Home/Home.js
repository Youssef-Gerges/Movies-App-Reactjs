import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import { useDispatch } from "react-redux";
import { fetchMovies, fetchShows } from "../../features/movies/movieSlice";

const Home = () => {
  const dispatch = useDispatch();
  const search = "harry";
  useEffect(() => {
    dispatch(fetchMovies(search));
    dispatch(fetchShows(search));
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;
