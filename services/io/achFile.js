'use strict';

var fs = require('fs');
var Q = require('q');

var config = require('../../utils/config.js');

const UTF8 = 'utf8';

/**
 * Load the ACH list from local file
 *
 * @return {Promise<array<AchInfo>>} ACH list
 */
function load() {
  return Q.nbind(fs.readFile, fs)(config.achFilePath, UTF8).then(function(data) {
    return JSON.parse(data);
  });
}

/**
 * Save the ACH list to local file
 *
 * @param {Promise<array<AchInfo>>} achList ACH list
 */
function save(achList) {
  return Q.nbind(fs.writeFile, fs)(config.achFilePath, JSON.stringify(achList), UTF8);
}

module.exports = {
  load: load,
  save: save
};
