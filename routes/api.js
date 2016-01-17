'use strict';

var express = require('express');
var router = express.Router();

var data = require('../services/data.js');

/* GET users listing. */
router.get('/:routingNumber', function(req, res, next) {
  var routingNumber = req.params.routingNumber;
  data.findByRoutingNumber(routingNumber).then(function(result) {
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
