/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes');
const { createUser, login } = require('./controllers/users');
const errorsHandler = require('./middlewares/errorHandler');
const { validateLoginData, validateRegisterData } = require('./utils/validators/userValidator');

const app = express();
const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Успешное подключение к базе данных');
  })
  .catch((error) => {
    console.error('Ошибка при подключении к базе данных:', error);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', validateLoginData, login);
app.post('/signup', validateRegisterData, createUser);

app.use((req, res, next) => {
  req.user = { _id: '64de79f0bdfb8bc3b6b30228' };
  next();
});

app.use(router);
app.use(errorsHandler);
app.use(errors());

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
