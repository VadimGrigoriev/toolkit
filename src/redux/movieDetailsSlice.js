import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovieDetails = createAsyncThunk(
  'movieDetails/fetchMovieDetails',
  async (imdbID) => {
    const response = await fetch(`https://www.omdbapi.com/?apikey=64405bd2&i=${imdbID}`);
    const data = await response.json();
    return data;
  }
);

const movieDetailsSlice = createSlice({
  name: 'movieDetails',
  initialState: {
    movie: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieDetailsSlice.reducer;
