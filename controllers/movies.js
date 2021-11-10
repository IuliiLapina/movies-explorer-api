const { ObjectId } = require('mongodb');
const Movie = require('../models/movie');
const { BadRequestError } = require('../errors/bad-request-error');
const { NotFoundError } = require('../errors/not-found-error');
const { ForbiddenError } = require('../errors/forbidden-error');
const MESSAGE = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send(movie.reverse()))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = ObjectId(req.user._id);

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadRequestError(MESSAGE.BadRequest);
      } else {
        next(err);
      }
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        return next(new NotFoundError(MESSAGE.NotFoundMovie));
      }

      if (movie.owner.toString() === req.user._id) {
        return movie.remove()
          .then((s) => res.status(200).send(s));
      }
      return next(new ForbiddenError(MESSAGE.Forbidden));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(MESSAGE.BadRequest);
      } else {
        next(err);
      }
    })
    .catch(next);
};
