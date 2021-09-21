const { celebrate } = require('celebrate');
const Joi = require('joi');
const validator = require('validator');

const validateRegistration = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: true } })
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
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
    password: Joi.string().required()
      .messages({
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2)
      .messages({
        'any.required': 'Поле "country" должно быть заполнено',
      }),
    director: Joi.string().required().min(2)
      .messages({
        'any.required': 'Поле "director" должно быть заполнено',
      }),
    duration: Joi.number().required().min(2)
      .messages({
        'any.required': 'Поле "duration" должно быть заполнено',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Поле "year" должно быть заполнено',
      }),
    description: Joi.string().required().min(2)
      .messages({
        'any.required': 'Поле "description" должно быть заполнено',
      }),
    image: Joi.string().required().min(2).custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "image" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "image" должно быть заполнено',
      }),
    trailer: Joi.string().required().min(2).custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "trailer" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "trailer" должно быть заполнено',
      }),
    thumbnail: Joi.string().required().min(2).custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле "thumbnail" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "thumbnail" должно быть заполнено',
      }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2)
      .messages({
        'any.required': 'Поле "nameRU" должно быть заполнено',
      }),
    nameEN: Joi.string().required().min(2)
      .messages({
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
      .messages({
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
