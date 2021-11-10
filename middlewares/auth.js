const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const { UnauthorizedError } = require('../errors/unauthorized-error');
const MESSAGE = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(MESSAGE.UnauthorizedError));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(MESSAGE.UnauthorizedError));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
