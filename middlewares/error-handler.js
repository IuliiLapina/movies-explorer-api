const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = {
  errorHandler,
};

/*
const { BadRequestError } = require('./errors/bad-request-error');

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (err.kind === 'ObjectId') {
    throw new BadRequestError('Переданы некорректные данные');
  } else {
  res.status(statusCode).send({ message: statusCode === 500
    ? 'На сервере произошла ошибка' : message });
  }
  next();
});
*/
