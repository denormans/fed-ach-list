'use strict';

var config = require('../../utils/config.js');

/**
 * Load the ACH list from S3
 *
 * @return {Promise<array<AchInfo>>} ACH list
 */
function load() {
  throw Error('S3 unsupported');
}

/**
 * Save the ACH list to S3
 *
 * @param {Promise<array<AchInfo>>} achList ACH list
 */
function save(achList) {
  throw Error('S3 unsupported');
}

module.exports = {
  load: load,
  save: save
};
