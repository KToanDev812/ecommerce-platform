const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const { default: helmet } = require('helmet');
const app = express();

// initialize middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// initialize routes
app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Welcome to the API',
  });
});

module.exports = app;