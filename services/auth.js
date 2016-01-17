'use strict';

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;

var config = require('../utils/config.js');

if (config.useApiKey) {
  passport.use(new BasicStrategy(
    function (username, password, callback) {
      if (username == config.apiUsername && password == config.apiKey) {
        callback(null, {username: username});
      } else {
        callback(null, false);
      }
    })
  );
}

function authenticate() {
  if (config.useApiKey) {
    return passport.authenticate('basic', { session: false });
  } else {
    return function(req, res, next) {
      next();
    };
  }
}

module.exports = {
  authenticate: authenticate
};
