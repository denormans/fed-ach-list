'use strict';

var moment = require('moment');
var winston = require('winston');

/**
 * Gets the timestamp for the message
 *
 * @returns {date} the timestamp
 */
var getMessageTimestamp = function() {
  return Date.now();
};

/**
 * Formats the message to the log
 *
 * @param {*} details the message details
 *
 * @returns {string} the formatted string
 */
var formatMessageDefault = function(details) {
  // Return string will be passed to logger.
  return moment(details.timestamp()).format('YYYY-MM-DD HH:mm:ss.SSS') + ' ' + details.level.toUpperCase() + ' ' + (undefined !== details.message ? details.message : '') +
      (details.meta && Object.keys(details.meta).length ? '\n\t' + JSON.stringify(details.meta) : '' );
};

var consoleTransport = new (winston.transports.Console)({
  timestamp: getMessageTimestamp,
  formatter: formatMessageDefault,
  level: 'info',
  colorize: true
});

var fileTransport = new (winston.transports.File)({
  filename: process.env.LOGFILE || 'fed-ach-list.log',
  timestamp: getMessageTimestamp,
  formatter: formatMessageDefault,
  json: false,
  maxsize: 10*1024*1024,
  maxFiles: 10,
  tailable: true
});

var logstashTransport = new (winston.transports.File)({
  filename: process.env.LOGSTASH_LOGFILE || 'fed-ach-list.logstash.log',
  logstash: true,
  maxsize: 10*1024*1024
});

winston.loggers.options.transports = [
  consoleTransport,
  fileTransport
];

var normalLogger = new (winston.Logger)({
  emitErrs: true,
  exitOnError: false
});

normalLogger.on('error', function(err) {
  console.log('Logging error:', err);
});

module.exports = {
  normal: winston.loggers.get(normalLogger)
};
