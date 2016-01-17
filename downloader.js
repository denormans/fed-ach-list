'use strict';

var fedach = require('fedach');
var fs = require('fs');
var Q = require('q');

var achIO = require('./services/io/ach.js');
var config = require('./utils/config.js');
var logger = require('./utils/logger.js').normal;

/**
 * Downloads the ACH list and stores it in the appropriate place.
 */
function downloadAndSave() {
  return download().then(function (achList) {
    return achIO.save(achList);
  });
}

/**
 * Downloads the ACH list from the Federal Reserve.
 *
 * @return {Promise<Array<AchInfo>>} ACH list
 */
function download() {
  if (config.testAchFile) {
    return Q.nbind(fs.readFile, fs)(config.testAchFile, 'utf8').then(function(data) {
      return Q(fedach.parse(data));
    })
  } else {
    return Q.nbind(fedach.download, fedach)();
  }
}

module.exports = {
  downloadAndSave: downloadAndSave
};
