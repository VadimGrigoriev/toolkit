import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (searchTerm) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=64405bd2&s=${searchTerm}`);
    const data = await response.json();
    return data.Search || [];
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearMovies: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
