import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../../redux/favoritesSlice";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  return (
    <div className="container my-5">
      <h1 className="text-center">Избранные фильмы</h1>
      <div className="row">
        {favorites.length > 0 ? (
          favorites.map((movie) => (
            <div key={movie.imdbID} className="col-md-4 col-lg-3 mb-4">
              <div className="card h-100">
                <Link to={`/movie/${movie.imdbID}`}>
                  {movie.Poster !== "N/A" ? (
                    <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                  ) : (
                    <div
                      className="card-img-top text-center bg-secondary text-white d-flex align-items-center justify-content-center"
                      style={{ height: '300px' }}
                    >
                      Постер не найденн
                    </div>
                  )}
                </Link>
                <div className="card-body p-2">
                  <h6 className="card-title text-center">
                    {movie.Title} ({movie.Year})
                  </h6>
                </div>
                <div className="card-footer p-2 text-center">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => dispatch(removeFavorite(movie.imdbID))}
                  >
                    Удалить из избранного
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">Нет избранных фильмов</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
