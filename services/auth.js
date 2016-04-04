'use strict';

var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var DigestStrategy = require('passport-http').DigestStrategy;
var HawkStrategy = require('passport-hawk');

var config = require('../utils/config.js');

if (config.useApiAuth) {
  switch (config.apiAlgorithm) {
    case config.ApiAuthAlgorithms.BASIC:
      passport.use(new BasicStrategy(
        function (username, password, callback) {
          if (username == config.apiUsername && password == config.apiKey) {
            callback(null, {username: username});
          } else {
            callback(null, false);
          }
        })
      );
      break;

    case config.ApiAuthAlgorithms.DIGEST:
      passport.use(new DigestStrategy({ realm: 'api' },
        function (username, callback) {
          if (username == config.apiUsername) {
            callback(null, username, config.apiKey);
          } else {
            callback(null, false);
          }
        },
        function(params, callback) {
          // validate nonces as necessary
          callback(null, true)
        })
      );
      break;

    case config.ApiAuthAlgorithms.HAWK:
      passport.use('hawk', new HawkStrategy(
        function (username, callback) {
          if (username == config.apiUsername) {
            callback(null, {
              user: {
                id: username
              },
              key: config.apiKey,
              algorithm: 'sha256'
            });
          } else {
            callback(null, false);
          }
        })
      );
      break;

    default:
      throw new Error('Unknown API auth algorithm:' + config.apiAlgorithm);
  }
}

function authenticate() {
  if (config.useApiAuth) {
    switch (config.apiAlgorithm) {
      case config.ApiAuthAlgorithms.BASIC:
        return passport.authenticate('basic', { session: false });
        break;

      case config.ApiAuthAlgorithms.DIGEST:
        return passport.authenticate('digest', { session: false });
        break;

      case config.ApiAuthAlgorithms.HAWK:
        return passport.authenticate('hawk', { session: false });
        break;

      default:
        throw new Error('Unknown API auth algorithm:' + config.apiAlgorithm);
    }
  } else {
    return noopAuth;
  }
}

function noopAuth(req, res, next) {
  next();
}

module.exports = {
  authenticate: authenticate
};
