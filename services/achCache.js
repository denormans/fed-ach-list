'use strict';

var moment = require('moment');

var achLoader = require('./achLoader.js');
var logger = require('../utils/logger.js').normal;

const CACHE_REFRESH_INTERVAL = 60*60*1000;

var achInfo = null;
var cacheLoadDate = null;

/**
 * Determines whether or not the cache is currently loaded.
 *
 * @returns {boolean} true if the cache is loaded
 */
function isCacheLoaded() {
  return !!achInfo;
}

/**
 * Returns ACH info by routing number.
 *
 * @param String routing the routing number
 * @returns {AchInfo} the ACH Info
 * @throws error if ACH list is not loaded
 */
function getByRouting(routing) {
  if (!isCacheLoaded()) {
    throw Error('ACH list not loaded');
  }

  return achInfo[routing];
}

/**
 * Loads the ACH info cache
 */
function loadCache() {
  logger.info('Loading ACH list cache...');
  achLoader.load().then(function(info) {
    achInfo = info;
    cacheLoadDate = moment();
    logger.info('Loaded ACH list cache');
  }).fail(function(err) {
    if (err.stack) {
      logger.warn('Failed to load ACH list cache:', err, '\n', err.stack);
    } else {
      logger.warn('Failed to load ACH list cache:', err.message, err);
    }
    logger.warn('Last ACH load:', cacheLoadDate ? cacheLoadDate.format(moment.ISO_8601) : 'NEVER!');
  });
}

(function cacheRefresh() {
  loadCache();
  setTimeout(cacheRefresh, CACHE_REFRESH_INTERVAL);
})();

module.exports = {
  isCacheLoaded: isCacheLoaded,
  getByRouting: getByRouting
};
