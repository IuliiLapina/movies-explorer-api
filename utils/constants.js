const MESSAGE = {
  BadRequest: 'Переданы некорректные данные',
  BadRequestUser: 'Переданы некорректные данные пользователя',
  NotFoundMovie: 'Фильма с таким id не существует',
  NotFoundUser: 'Пользователь с таким id не найден',
  NotFoundPage: 'Страница не найдена',
  Forbidden: 'Недостаточно прав для действия',
  ConflictingUser: 'Такой пользователь уже существует',
  ConflictingUserEmail: 'Пользователь с таким email уже существует',
  Unauthorized: 'Неправильные email или пароль',
  UnauthorizedError: 'Произошла ошибка авторизации',
  ServerError: 'На сервере произошла ошибка',
  NotCorrectEmail: 'Неправильный формат почты',
  NotCorrectUrl: 'Неправильный формат ccылки',
};

module.exports = MESSAGE;
