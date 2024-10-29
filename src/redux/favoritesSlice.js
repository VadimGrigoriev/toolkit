import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      // Добавление фильма, если его еще нет в избранном
      const existing = state.find(movie => movie.imdbID === action.payload.imdbID);
      if (!existing) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      return state.filter(movie => movie.imdbID !== action.payload);
    }
  }
});

export const {addFavorite, removeFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer;
