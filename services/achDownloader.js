'use strict';

var fedach = require('fedach');
var fs = require('fs');
var request = require('request');
var Q = require('q');

var achIO = require('./io/ach.js');
var config = require('../utils/config.js');

/**
 * Downloads the ACH list and stores it in the appropriate place.
 */
function downloadAndSave() {
  return download().then(function (achList) {
    return achIO.save(achList).then(function() {
      return achList;
    });
  });
}

/**
 * Downloads the ACH list from the Federal Reserve.
 *
 * @return {Promise<Array<AchInfo>>} ACH list
 */
function download() {
  var dataPromise;

  if (config.testAchFile) {
    dataPromise = Q.nbind(fs.readFile, fs)(config.testAchFile, 'utf8')
  } else {
    var jar = request.jar();

    dataPromise = Q.nfbind(request)({
      uri: 'https://www.frbservices.org/EPaymentsDirectory/submitAgreement',
      method: 'POST',
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10,
      jar: jar,
      form: {
        agreementValue: 'Agree'
      }
    }).then(function(response) {
      return Q.nfbind(request)({
        uri: 'https://www.frbservices.org/EPaymentsDirectory/FedACHdir.txt',
        method: 'GET',
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10,
        jar: jar
      });
    }).then(function(response) {
      if (response.length < 2) {
        throw Error('No response body from frbservices.org');
      }

      return response[1];
    });
  }

  return dataPromise.then(function(data) {
    return fedach.parse(data);
  })
}

module.exports = {
  downloadAndSave: downloadAndSave
};
