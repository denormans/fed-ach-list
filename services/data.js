'use strict';

var Q = require('q');

var achCache = require('./achCache.js');

module.exports = {
  getByRouting: function(routing) {
    return Q(achCache.getByRouting(routing));
  }
};
