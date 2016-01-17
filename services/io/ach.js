'use strict';

var config = require('../../utils/config.js');

var achFile = require('./achFile.js');
var achS3 = require('./achS3.js');

module.exports = {
  load: config.useS3 ? achS3.load : achFile.load,
  save: config.useS3 ? achS3.save : achFile.save
};
