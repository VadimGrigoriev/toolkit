import './App.css'
import SearchMovies from './components/SearchMovies/SearchMovies';
import MovieDetails from './components/MoviesDetails/MovieDetails';
import Favorites from './components/Favorites/Favorites';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SearchMovies />} />
        <Route path="/movie/:imdbID" element={<MovieDetails />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  )
}

export default App
