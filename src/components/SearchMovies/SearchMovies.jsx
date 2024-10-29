import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, clearMovies } from "../../redux/moviesSlice";
import { Link } from "react-router-dom";
import { addFavorite, removeFavorite } from "../../redux/favoritesSlice";

const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.movies);
  const favorites = useSelector((state) => state.favorites);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      dispatch(fetchMovies(query));
    }
  };

  const handleClear = () => {
    dispatch(clearMovies());
    setQuery('');
  };

  const isFavorite = (movie) => {
    return favorites.some((fav) => fav.imdbID === movie.imdbID);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Поиск фильмов</h1>
      <form className="text-center mb-4" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control mb-3"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите название фильма на английском языке..."
          style={{ maxWidth: '500px', margin: '0 auto' }}
        />
        <button type="submit" className="btn btn-primary mr-2" style={{ minWidth: '120px', marginRight: '10px' }}>Поиск</button>
        <button type="button" className="btn btn-secondary" style={{ minWidth: '120px' }} onClick={handleClear}>Сбросить</button>
      </form>

      {loading && <p>Поиск...</p>}
      {error && <p className="text-danger">Ошибка: {error}</p>}

      <div className="row">
        {items.length === 0 && !loading && <p className="text-center">Фильмы не найдены</p>}
        {items.map((movie) => (
          <div key={movie.imdbID} className="col-md-4 col-lg-3 mb-4">
            <div className="card h-100">
              <Link to={`/movie/${movie.imdbID}`}>
                {movie.Poster !== "N/A" ? (
                  <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                ) : (
                  <div className="card-img-top text-center bg-secondary text-white">Постер не найден</div>
                )}
              </Link>
              <div className="card-body p-2">
                <h6 className="card-title text-center">{movie.Title} ({movie.Year})</h6>
              </div>
              <div className="card-footer p-2 text-center">
                {isFavorite(movie) ? (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => dispatch(removeFavorite(movie.imdbID))}
                  >
                    Удалить из Избранных
                  </button>
                ) : (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => dispatch(addFavorite(movie))}
                  >
                    Добавить в Избранные
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchMovies;
