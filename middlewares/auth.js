const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const { UnauthorizedError } = require('../errors/unauthorized-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Произошла ошибка авторизации'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new UnauthorizedError('Произошла ошибка авторизации'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
