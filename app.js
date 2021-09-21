require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');

const router = require('./routes/index');
const { requestLogger } = require('./middlewares/logger');
const { errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/error-handler');
const { limiter } = require('./middlewares/rate-limit');
const { MONGO_URL } = require('./config');

const { PORT = 3000 } = process.env;
const app = express();

// подключаемся к серверу mongo
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const corsOptions = {
  origin: [
    'https://api.best-movies-explorer.nomoredomains.club',
    'http://api.best-movies-explorer.nomoredomains.club',
    'http://62.84.112.11',
    'http://localhost:3000',
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(requestLogger); // логгер запросов
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(bodyParser.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик ошибок

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
