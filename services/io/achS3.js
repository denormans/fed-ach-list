'use strict';

var aws = require('aws-sdk');
var Q = require('q');

var s3 = new aws.S3();

var config = require('../../utils/config.js');

/**
 * Load the ACH list from S3
 *
 * @return {Promise<array<AchInfo>>} ACH list
 */
function load() {
  return Q.nbind(s3.getObject, s3)({
    Bucket: config.achS3Bucket,
    Key: config.achS3Path
  }).then(function (data) {
    return JSON.parse(data.Body);
  });
}

/**
 * Save the ACH list to S3
 *
 * @param {Promise<array<AchInfo>>} achList ACH list
 */
function save(achList) {
  return Q.nbind(s3.putObject, s3)({
    Bucket: config.achS3Bucket,
    Key: config.achS3Path,
    ContentType: 'application/json',
    Body: JSON.stringify(achList)
  });
}

module.exports = {
  load: load,
  save: save
};
