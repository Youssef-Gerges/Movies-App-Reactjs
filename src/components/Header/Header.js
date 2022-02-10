import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMovies, fetchShows } from "../../features/movies/movieSlice";

import user from "../../images/user.png";
import "./header.scss";

const Header = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (search !== "") {
      dispatch(fetchMovies(search));
      dispatch(fetchShows(search));
      setSearch("");
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="logo">Movie App</div>
      </Link>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Search Movie  Or Show"
            value={search}
            onChange={(ref) => setSearch(ref.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="user-img">
        <img src={user} alt="user Image" />
      </div>
    </div>
  );
};

export default Header;
