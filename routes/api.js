'use strict';

var express = require('express');
var router = express.Router();

var data = require('../services/data.js');

/* GET routing number */
router.get('/ach/:routingNumber', function(req, res, next) {
  var routingNumber = req.params.routingNumber;
  data.getByRouting(routingNumber).then(function(result) {
    if (!result) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
      return;
    }
    res.send(result);
  });
});

module.exports = router;
