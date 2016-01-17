'use strict';

var express = require('express');
var router = express.Router();

var achCache = require('../services/achCache.js');

/* GET users listing. */
router.get('/health', function(req, res, next) {
  if (achCache.isCacheLoaded()) {
    return res.send('OK');
  } else {
    var err = new Error('Service not available');
    err.status = 503;

    res.status(err.status);
    res.render('error', {
      message: err.message,
      error: {}
    });
  }
});

module.exports = router;
