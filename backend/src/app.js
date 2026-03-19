require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const compression = require('compression');
const { default: helmet } = require('helmet');
const app = express();

// initialize middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// initialize database
require('./dbs/init.mongodb');
const { checkOverload } = require('./helpers/check.connect');
checkOverload();

// initialize routes
app.use('/', require('./routes'));

module.exports = app;