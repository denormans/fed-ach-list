'use strict';

var config = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',

  env: process.env.NODE_ENV
};

if (config.env === undefined) {
  config.env = 'development';
}

config.isDevelopment = config.env === config.DEVELOPMENT;
config.isProduction = config.env === config.PRODUCTION;

module.exports = config;
