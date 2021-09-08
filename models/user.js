const mongoose = require('mongoose');
const validator = require('validator');

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

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);