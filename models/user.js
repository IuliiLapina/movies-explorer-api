const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../errors/unauthorized-error');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false, // Поведение по умолчанию, чтобы база данных не возвращала это поле
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Фёдор',
  },
});

// Метод, чтобы при создании пользователя не возвращался пароль
function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}
userSchema.methods.toJSON = toJSON;

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные Email или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные Email или пароль');
          }
          return user;
        });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
