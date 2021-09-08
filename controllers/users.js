const User = require('../models/user');
// const { ConflictingError } = require('../errors/conflicting-error');
const { NotFoundError } = require('../errors/not-found-error');
// const { UnauthorizedError } = require('../errors/unauthorized-error');
const { BadRequestError } = require('../errors/bad-request-error');

// возвращает информацию о пользователе (email и имя)
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь с данным id не найден'));
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные пользователя');
      } else {
        next(err);
      }
    })
    .catch((error) => next(error));
};

// обновляет информацию о пользователе (email и имя)
module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    userId,
    { email, name },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь с данным id не найден'));
      }
      return res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные пользователя');
      } else {
        next(err);
      }
    })
    .catch((error) => next(error));
};