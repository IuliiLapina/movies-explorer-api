const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
// const { celebrate, Joi, errors } = require('celebrate');

const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');

const { PORT = 3000 } = process.env;
const app = express();


// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/moviesdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(helmet());

app.use('/users', userRouter);
app.use('/movies', movieRouter);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
