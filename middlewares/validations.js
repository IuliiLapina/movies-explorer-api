const { celebrate, Joi } = require('celebrate');

const patternURL = (/https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-z]{1,6}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]*)/);

const validateRegistration = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: true } })
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .message({
        'any.required': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30)
      .message({
        'any.required': 'Поле "name" должно быть заполнено',
      }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: true } })
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .message({
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2)
      .message({
        'any.required': 'Поле "country" должно быть заполнено',
      }),
    director: Joi.string().required().min(2)
      .message({
        'any.required': 'Поле "director" должно быть заполнено',
      }),
    duration: Joi.number().required().min(2)
      .message({
        'any.required': 'Поле "duration" должно быть заполнено',
      }),
    year: Joi.string().required()
      .message({
        'any.required': 'Поле "year" должно быть заполнено',
      }),
    description: Joi.string().required().min(2)
      .message({
        'any.required': 'Поле "description" должно быть заполнено',
      }),
    image: Joi.string().required().min(2).pattern(patternURL)
      .message({
        'any.required': 'Поле "image" должно быть заполнено',
      }),
    trailer: Joi.string().required().min(2).pattern(patternURL)
      .message({
        'any.required': 'Поле "trailer" должно быть заполнено',
      }),
    thumbnail: Joi.string().required().min(2).pattern(patternURL)
      .message({
        'any.required': 'Поле "thumbnail" должно быть заполнено',
      }),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required().min(2)
      .message({
        'any.required': 'Поле "nameRU" должно быть заполнено',
      }),
    nameEN: Joi.string().required().min(2)
      .message({
        'any.required': 'Поле "nameEN" должно быть заполнено',
      }),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

const validateGetUser = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: true } })
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.required': 'Поле "email" должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .message({
        'any.required': 'Поле "name" должно быть заполнено',
      }),
  }),
});

module.exports = {
  validateRegistration,
  validateAuthentication,
  validateCreateMovie,
  validateDeleteMovie,
  validateGetUser,
  validateUpdateUser,
};
