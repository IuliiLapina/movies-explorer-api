const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
// const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/not-found-error');
const { createUser, login } = require('../controllers/users');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: true } }),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: true } }),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  }),
}), login);

// router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

module.exports = router;
