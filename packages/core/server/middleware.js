const path = require('path');
const toobusy = require('toobusy-js');
const config = require('../config');
const utils = require('../utils');

const cwd = process.cwd();

const { APP_HOSTNAME } = config;
const FORCE_WWW = /^www\./.test(APP_HOSTNAME);

toobusy.maxLag(70);
toobusy.interval(500);

const custom503Exists = utils.fileExists('./server/503.html');
const custom503Path = path.join(cwd, './server/503.html');
const default503Response = 'Service Unavailable';

function enforceHTTPS(req, res, next) {
  console.log(req.hostname);
  console.log(req.hostname);
  console.log(req.hostname);
  console.log(req.hostname);
  console.log(req.hostname);
  console.log(req.hostname);

  // Prevent hostname spoofing
  if (req.hostname.indexOf(APP_HOSTNAME) === -1) {
    res.sendStatus(403);
    return;
  }

  // Construct the "true" request URL
  const finalUrl = `https://${APP_HOSTNAME}${req.originalUrl}`;
  const hasWWW = req.hostname.indexOf('www.') === 0;

  // Force www subdomain
  if (FORCE_WWW && !hasWWW) {
    res.redirect(301, finalUrl);
    return;
  }

  // Strip www subdomain
  if (!FORCE_WWW && hasWWW) {
    res.redirect(301, finalUrl);
    return;
  }

  // Determine if the request was done over HTTPS
  const isSecure = req.secure && req.headers['x-forwarded-proto'] === 'https';

  // Redirect HTTP to HTTPS
  if (!isSecure) {
    res.redirect(301, finalUrl);
    return;
  }

  // If everything looks good, move on
  next();
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
  enforceHTTPS,
  checkIfTooBusy,
  maintenanceApiResponse,
  maintenancePageResponse,
};
