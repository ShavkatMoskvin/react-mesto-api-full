/* eslint-disable linebreak-style */
require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const Unauthorized = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  const token = req.cookies.jwt;

  if (!token) {
    throw new Unauthorized('Необходима авторизация2', token);
  }

  let payload;
  try {
    payload = jsonwebtoken.verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : 'secret');
  } catch (err) {
    throw new Unauthorized('Необходима авторизация2', token);
  }
  req.user = payload;
  next();
  return true;
};
