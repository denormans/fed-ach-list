'use strict';

var express = require('express');
var router = express.Router();

var downloader = require('../services/achDownloader.js');

/* Process messages off the queue (for EB workers) */
router.post('/', function(req, res, next) {
  // nothing to do yet
});

/* Download the ACH file (for EB worker cron) */
router.post('/achupdate', function(req, res, next) {
  downloader.downloadAndSave().then(function (achList) {
    if (!achList || !achList.length) {
      var err = Error("Error downloading ACH");
      err.status(500);
      next(err);
      return;
    }

    res.send({ numLines: achList.length });
  });
});

module.exports = router;
