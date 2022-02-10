import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchMovieOrShowDetail,
  getSelectedItem,
  removeSelectedMovieOrShow,
} from "../../features/movies/movieSlice";

import "./movieDetail.scss";

const MovieDetail = (props) => {
  const { imdbId } = useParams();
  const dispatch = useDispatch();
  const item = useSelector(getSelectedItem);
  console.log(item);
  useEffect(() => {
    dispatch(fetchMovieOrShowDetail(imdbId));
    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbId]);

  return (
    <div className="movie-section">
      {Object.keys(item).length > 0 ? (
        <React.Fragment>
          <div className="section-left">
            <div className="movie-title">{item.Title}</div>
            <div className="movie-rating">
              <span>
                IMDB Rating
                <i className="fa fa-star"></i> : {item.imdbRating}
              </span>
              <span>
                IMDB Votes
                <i className="fa fa-thumbs-up"></i> : {item.imdbVotes}
              </span>
              <span>
                Runtime
                <i className="fa fa-film"></i> : {item.Runtime}
              </span>
              <span>
                Year
                <i className="fa fa-calendar"></i> : {item.Year}
              </span>
            </div>

            <div className="movie-plot">{item.Plot}</div>
            <div className="movie-info">
              <div>
                <span>Director</span>
                <span>{item.Director}</span>
              </div>
              <div>
                <span>Stars</span>
                <span>{item.Actors}</span>
              </div>
              <div>
                <span>Genres</span>
                <span>{item.Genre}</span>
              </div>
              <div>
                <span>Languages</span>
                <span>{item.Language}</span>
              </div>
              <div>
                <span>Awards</span>
                <span>{item.Awards}</span>
              </div>
            </div>
          </div>

          <div className="section-right">
            <img src={item.Poster} alt={item.Title} />
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>...Loading</React.Fragment>
      )}
    </div>
  );
};

export default MovieDetail;
