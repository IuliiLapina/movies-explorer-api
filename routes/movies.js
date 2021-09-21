const router = require('express').Router();
const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validations');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

// возвращает все сохранённые пользователем фильмы
router.get('/', getMovies);

// создаёт фильм
router.post('/', validateCreateMovie, createMovie);

// удаляет сохранённый фильм по id
router.delete('/:movieId', validateDeleteMovie, deleteMovie);

module.exports = router;
