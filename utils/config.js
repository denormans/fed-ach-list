'use strict';

var logger = require('./logger.js').normal;

var config = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',

  env: process.env.NODE_ENV,

  apiUsername: process.env.API_USERNAME,
  apiKey: process.env.API_KEY,
  apiAlgorithm: process.env.API_AUTH_ALGORITHM,

  ApiAuthAlgorithms: {
    BASIC: 'basic',
    DIGEST: 'digest'
  },

  testAchFile: process.env.TEST_ACH_FILE,

  achFilePath: process.env.ACH_FILE_PATH,

  achS3Bucket: process.env.ACH_S3_BUCKET,
  achS3Path: process.env.ACH_S3_PATH
};

if (!config.env) {
  config.env = config.DEVELOPMENT;
  logger.info('No environment specified, using', config.env);
}

config.env = config.env.toLowerCase();

config.isDevelopment = config.env === config.DEVELOPMENT;
config.isProduction = config.env === config.PRODUCTION;

// Whether or not to use an API key
var hasApiUsername = !!config.apiUsername;
var hasApiKey = !!config.apiKey;
config.useApiAuth = hasApiUsername && hasApiKey;

if (hasApiUsername != hasApiKey) {
  logger.warn('API username or key set without the other')
}

if (config.useApiAuth) {
  if (!config.apiAlgorithm) {
    config.apiAlgorithm = config.ApiAuthAlgorithms.BASIC;
    logger.info('No API Algorithm specified, using', config.apiAlgorithm);
  }

  config.apiAlgorithm = config.apiAlgorithm.toLowerCase();

  var algoFound = false;
  for (var key in config.ApiAuthAlgorithms) {
    if (config.ApiAuthAlgorithms.hasOwnProperty(key) && config.ApiAuthAlgorithms[key] === config.apiAlgorithm) {
      algoFound = true;
    }
  }

  if (!algoFound) {
    logger.warn('Unknown API authorization algorithm: ' + config.apiAlgorithm + '. Using ' + config.ApiAuthAlgorithms.BASIC);
    config.apiAlgorithm = config.ApiAuthAlgorithms.BASIC;
  }
} else {
  logger.info('Not using API authorization');
}

// Set up AWS S3
config.useS3 = !!config.achS3Bucket;
if (config.useS3) {
  logger.info('Using S3 bucket:', config.achS3Bucket);

  if (!config.achS3Path) {
    config.achS3Path = config.env + '/fed-ach-list.json';
    logger.info('No S3 path specified, using', config.achS3Path);
  } else {
    logger.info('Using S3 path:', config.achS3Path);
  }
}

// Set up file path if not using S3
if (!config.useS3) {
  if (!config.achFilePath) {
    config.achFilePath = 'fed-ach-list.json';
    logger.info('No file path specified, using:', config.achFilePath);
  } else {
    logger.info('Using file path:', config.achFilePath)
  }
}

module.exports = config;
