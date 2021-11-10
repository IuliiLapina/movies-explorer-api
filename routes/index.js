const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors/not-found-error');
const { createUser, login } = require('../controllers/users');
const { validateRegistration, validateAuthentication } = require('../middlewares/validations');
const MESSAGE = require('../utils/constants');

// Регистрация
router.post('/signup', validateRegistration, createUser);

// Аутентификация
router.post('/signin', validateAuthentication, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => next(new NotFoundError(MESSAGE.NotFoundPage)));

module.exports = router;
