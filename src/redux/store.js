import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from './moviesSlice';
import movieDetailsReducer from './movieDetailsSlice';
import favoritesReducer from './favoritesSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    movieDetails: movieDetailsReducer,
    favorites: favoritesReducer,
  },
});

export default store;
