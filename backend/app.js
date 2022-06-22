require('dotenv').config();
const process = require('process');
const express = require('express');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');

const app = express();
const { PORT = 3001 } = process.env;
app.use(express.json());

app.use(cors({
  origin: [
    'http://moskvin.nomoreparties.sbs',
    'https://moskvin.nomoreparties.sbs',
    'http://api.moskvin.nomoreparties.sbs',
    'https://api.moskvin.nomoreparties.sbs',
    'http://localhost:3000',
    'http://localhost:3001',
    '127.0.0.1',
  ],
  credentials: true,
}));

const cookieParser = require('cookie-parser');

app.use(cookieParser());

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { validateUrl } = require('./utils/utils');
const NotFoundError = require('./errors/NotFoundError');
const { mongoose } = require('./utils/constants');
const { login, createUser } = require('./controllers/users');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateUrl, 'custom validation'),
  }),
}), createUser);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(auth);
app.use(userRouter);
app.use(cardRouter);

app.use(errorLogger);

app.use('/', (req, res, next) => {
  next(new NotFoundError('Неорректный путь запроса'));
});

app.use(errors());
app.use(errorHandler); // Централизованный обработчик ошибок

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
