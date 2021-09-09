const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { ConflictingError } = require('../errors/conflicting-error');
const { NotFoundError } = require('../errors/not-found-error');
const { UnauthorizedError } = require('../errors/unauthorized-error');
const { BadRequestError } = require('../errors/bad-request-error');

// Регистрация - создать нового пользователя
module.exports.createUser = (req, res, next) => {
  const { email, password, name } = req.body;
  // Проверим, передали ли данные
  if (!email || !password || !name) {
    next(new BadRequestError('Все поля должны быть заполнены'));
  }
  // Проверим, существует ли уже такой пользователь
  User.findOne({ email })
    .then((user) => {
      if (user) {
        next(new ConflictingError('Такой пользователь уже существует'));
      }
      // захешируем пароль
      bcrypt.hash(password, 10)
        .then((hash) =>
          // создадим документ на основе пришедших данных
          User.create({ email, password: hash, name })
            // вернём записанные в базу данные
            .then((user) => {
              res.status(201).send(user);
            })
            // данные не записались, вернём ошибку
            .catch((err) => {
              if (err.name === 'MongoError' && err.code === 11000) {
                throw new ConflictingError('Пользователь с такой почтой уже существует');
              }
              if (err.name === 'ValidationError' || err.name === 'CastError') {
                throw new BadRequestError('Переданы некорректные данные пользователя');
              } else {
                next(err);
              }
            })
            .catch((error) => next(error)));
    });
};

// Аутентификация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  // Проверим, передали ли данные
  if (!email || !password) {
    throw new BadRequestError('Email или пароль не заполнены');
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // аутентификация успешна! пользователь в переменной user
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET
          : 'some-secret-key',
        { expiresIn: '7d' },
      );

      // переделать на куки
      // если сохранять JWT в куках,
      // понадобится дополнительный роут POST /signout.
      // При запросе к роуту удалится JWT из куков пользователя.
      /* res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        maxAge: 3600000 * 24 * 7,
      }).status(200).send({ token });
      */
      return res.send({ token });
    })
    .catch(() => next(new UnauthorizedError('Произошла ошибка авторизации')));
};

// возвращает информацию о пользователе (email и имя)
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Такой пользователь не найден'));
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

  // проверим, существует ли уже пользователь с таким email
  User.findById(userId)
    .then((user) => {
      if (user.email === req.body) {
        return (new ConflictingError('Пользователь с такой почтой уже существует'));
      }
      // обновим данные пользователя
      return User.findByIdAndUpdate(
        userId,
        { email, name },
        { new: true, runValidators: true },
      )
        .then((user) => {
          if (!user) {
            next(new NotFoundError('Пользователь с данным id не найден'));
          }
          return res.send({ data: user });
        });
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
