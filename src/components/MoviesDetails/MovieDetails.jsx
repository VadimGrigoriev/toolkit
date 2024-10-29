import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from '../../redux/movieDetailsSlice';
import { addFavorite, removeFavorite } from '../../redux/favoritesSlice';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movie, loading, error } = useSelector((state) => state.movieDetails);
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(fetchMovieDetails(imdbID));
  }, [dispatch, imdbID]);

  const isFavorite = favorites.some((fav) => fav.imdbID === imdbID);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) return <p>Загрузка информации о фильме...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className="container my-5">
      <button
        onClick={handleBackClick}
        className="btn btn-outline-secondary mb-4"
        title="Назад к списку"
      >
        ← Назад
      </button>

      {movie ? (
        <div className="card mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 mb-4">
                {movie.Poster !== 'N/A' ? (
                  <img src={movie.Poster} alt={movie.Title} className="img-fluid rounded" />
                ) : (
                  <div className="img-fluid rounded bg-secondary text-white d-flex align-items-center justify-content-center" style={{ height: '400px' }}>
                    No poster available
                  </div>
                )}
              </div>
              <div className="col-md-8">
                <h1 className="card-title">{movie.Title}</h1>
                <ul className="list-unstyled mt-3">
                  <li><strong>Год выпуска:</strong> {movie.Year}</li>
                  <li><strong>Жанр:</strong> {movie.Genre}</li>
                  <li><strong>Продолжительность:</strong> {movie.Runtime}</li>
                  <li><strong>Режиссер:</strong> {movie.Director}</li>
                  <li><strong>Актеры:</strong> {movie.Actors}</li>
                  <li><strong>Рейтинг IMDb:</strong> {movie.imdbRating}</li>
                </ul>
                <p className="mt-3"><strong>Сюжет:</strong> {movie.Plot}</p>
                <div className="mt-4">
                  {isFavorite ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => dispatch(removeFavorite(movie.imdbID))}
                    >
                      Удалить из избранного
                    </button>
                  ) : (
                    <button
                      className="btn btn-success"
                      onClick={() => dispatch(addFavorite(movie))}
                    >
                      Добавить в избранное
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Информация о фильме не найдена</p>
      )}
    </div>
  );
};

export default MovieDetails;
