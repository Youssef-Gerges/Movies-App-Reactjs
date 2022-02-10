import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MovieAPI from "../../common/APIs/MovieApi";
import { APIKey } from "../../common/APIs/MovieApiKey";

const initialState = {
  movies: {},
  shows: {},
  selectedItem: {},
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (search) => {
    const response = await MovieAPI.get(
      `?apikey=${APIKey}&s=${search}&type=movie`
    );
    return response.data;
  }
);

export const fetchShows = createAsyncThunk(
  "movies/fetchShows",
  async (search) => {
    const response = await MovieAPI.get(
      `?apikey=${APIKey}&s=${search}&type=series`
    );
    return response.data;
  }
);

export const fetchMovieOrShowDetail = createAsyncThunk(
  "movies/fetchMovieOrShowDetail",
  async (id) => {
    const response = await MovieAPI.get(`?apikey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      return { ...state, selectedItem: {} };
    },
  },
  extraReducers: {
    [fetchMovies.pending]: () => {
      console.log("pending");
    },
    [fetchMovies.fulfilled]: (state, { payload }) => {
      return { ...state, movies: payload };
    },
    [fetchMovies.rejected]: () => {
      console.log("request rejected");
    },

    [fetchShows.pending]: () => {
      console.log("pending");
    },
    [fetchShows.fulfilled]: (state, { payload }) => {
      return { ...state, shows: payload };
    },
    [fetchShows.rejected]: () => {
      console.log("request rejected");
    },
    [fetchMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      return { ...state, selectedItem: payload };
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllSeries = (state) => state.movies.shows;
export const getSelectedItem = (state) => state.movies.selectedItem;
export default movieSlice.reducer;
