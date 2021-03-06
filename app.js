'use strict';

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var express = require('express');
var morgan = require('morgan');
var path = require('path');

var config = require('./utils/config.js');
var logger = require('./utils/logger.js').normal;

var auth = require('./services/auth.js');

var statusRoute = require('./routes/status');
var apiRoute = require('./routes/api');
var processRoute = require('./routes/process');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(morgan(config.isDevelopment ? 'dev' : 'combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/status', statusRoute);
app.use('/', auth.authenticate());
app.use('/api', apiRoute);
app.use('/process', processRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

app.use(function(err, req, res, next) {
  if (err.status && err.status < 500) {
    logger.debug('Status error:', err.message, err);
  } else if (err.stack) {
    logger.error('Unhandled error:', err, '\n', err.stack);
  } else {
    logger.error('Unhandled error:', err.message, err);
  }

  res.status(err.status || 500);
  if (config.isDevelopment) {
    // development error handler
    // will print stacktrace
    res.render('error', {
      message: err.message,
      error: err
    });
  } else {
    // production error handler
    // no stacktraces leaked to user
    res.render('error', {
      message: err.message,
      error: {}
    });
  }
});

module.exports = app;
