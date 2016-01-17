'use strict';

var logger = require('./logger.js').normal;

var config = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',

  env: process.env.NODE_ENV,

  apiKey: process.env.API_KEY,

  testAchFile: process.env.TEST_ACH_FILE,

  achFilePath: process.env.ACH_FILE_PATH,

  achS3Bucket: process.env.ACH_S3_BUCKET,
  achS3Path: process.env.ACH_S3_PATH
};

if (!config.env) {
  config.env = config.DEVELOPMENT;
  logger.info('No environment specified, using', config.env);
}

config.isDevelopment = config.env === config.DEVELOPMENT;
config.isProduction = config.env === config.PRODUCTION;

// Whether or not to use an API key
config.useApiKey = !!config.apiKey;

if (!config.useApiKey) {
  logger.info('Not using API key');
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
