const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = require('mongodb');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      require_protocol: true,
      message: 'Неправильный формат ccылки',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      require_protocol: true,
      message: 'Неправильный формат ccылки',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      require_protocol: true,
      message: 'Неправильный формат ccылки',
    },
  },
  owner: {
    type: ObjectId,
    required: true,
  },
  movieId: {
    type: ObjectId,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

movieSchema.methods.toJSON = toJSON;