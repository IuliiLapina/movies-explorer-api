const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, updateUser } = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: true } }),
    name: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

module.exports = router;
