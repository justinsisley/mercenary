/* eslint-disable import/no-unresolved */
const path = require('path');
const toobusy = require('toobusy-js');
const utils = require('../utils');

const cwd = process.cwd();

toobusy.maxLag(70);
toobusy.interval(500);

const custom503Exists = utils.fileExists('./server/503.html');
const custom503Path = path.join(cwd, './server/503.html');
const default503Response = 'Service Unavailable';

function validateHostname(req, res) {
  console.log(req);
  console.log(req.hostname);

  res.json({
    hostname: req.hostname,
  });
  // next();
}

function checkIfTooBusy(req, res, next) {
  // If the server is getting more traffic than it can handle, refuse some
  // requests to prevent taking down the entire server
  if (toobusy()) {
    // API responses should be JSON
    if (req.url.indexOf('/api') === 0) {
      res.status(503).json({ message: 'unavailable' });
      return;
    }

    // Allow custom 503 page
    if (custom503Exists) {
      res.status(503).sendFile(custom503Path);
      return;
    }

    // Default response
    res.status(503).send(default503Response);
    return;
  }

  // If everything looks good, move on
  next();
}

function maintenanceApiResponse(req, res) {
  res.status(503).json({});
}

function maintenancePageResponse(req, res) {
  // Allow custom 503 page
  if (custom503Exists) {
    res.status(503).sendFile(custom503Path);
    return;
  }

  // Default response
  res.status(503).send(default503Response);
}

module.exports = {
  validateHostname,
  checkIfTooBusy,
  maintenanceApiResponse,
  maintenancePageResponse,
};
