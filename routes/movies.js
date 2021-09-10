const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const patternURL = (/https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-z]{1,6}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]*)/);
// возвращает все сохранённые пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле
// country, director, duration, year, description,
// image, trailer, nameRU, nameEN и thumbnail, movieId
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required().min(2),
    duration: Joi.number().required().min(2),
    year: Joi.string().required(),
    description: Joi.string().required().min(2),
    image: Joi.string().required().min(2).pattern(patternURL),
    trailer: Joi.string().required().min(2).pattern(patternURL),
    thumbnail: Joi.string().required().min(2).pattern(patternURL),
    // owner: Joi.string().required().min(2),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required().min(2),
    nameEN: Joi.string().required().min(2),
  }),
}), createMovie);

// удаляет сохранённый фильм по id
router.delete('/movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
}), deleteMovie);

module.exports = router;
