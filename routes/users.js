const router = require('express').Router();
const { getUser } = require('../controllers/users');
const { updateUser } = require('../controllers/users');
const { validateGetUser, validateUpdateUser } = require('../middlewares/validations');

// возвращает информацию о пользователе (email и имя)
router.get('/me', validateGetUser, getUser);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', validateUpdateUser, updateUser);

module.exports = router;
