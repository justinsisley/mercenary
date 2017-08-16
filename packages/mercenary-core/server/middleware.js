const path = require('path');
const toobusy = require('toobusy-js');
const config = require('../config');
const utils = require('./utils');

const cwd = process.cwd();

const HOSTNAME = config.hostname;
const WWW = config.www;

const custom503Exists = utils.fileExists('./server/503.html');
const custom503Path = path.join(cwd, './server/503.html');
const default503Response = 'Service Unavailable: Too Much Traffic';

function enforceHTTPS(req, res, next) {
  let hostname = HOSTNAME;

  // Prevent hostname spoofing
  // if (req.hostname.indexOf(hostname) === -1) {
    // res.sendStatus(403);
    // return;
  // }

  // Configure hostname if forcing www subdomain
  if (WWW.force) {
    hostname = `www.${hostname}`;
  }

  const finalUrl = `https://${hostname}${req.originalUrl}`;
  const hasWWW = req.hostname.indexOf('www.') === 0;

  // Force www subdomain
  if (WWW.force && !hasWWW) {
    res.redirect(301, finalUrl);
    return;
  }

  // Strip www subdomain
  if (!WWW.force && hasWWW) {
    res.redirect(301, finalUrl);
    return;
  }

  const isSecure = req.secure && req.headers['x-forwarded-proto'] === 'https';

  // Redirect HTTP to HTTPS
  if (!isSecure) {
    res.redirect(301, finalUrl);
    return;
  }

  next();
}

function checkIfTooBusy(req, res, next) {
  // If the server is getting more traffic than it can handle, refuse some
  // requests to prevent taking down the entire server
  if (toobusy()) {
    // API responses should be JSON
    if (req.url.indexOf('/api') === 0) {
      res.status(503).json({});
      return;
    }

    // Allow custom 503 page
    if (custom503Exists) {
      res.sendFile(custom503Path);
      return;
    }

    // Default response
    res.status(503).send(default503Response);
    return;
  }

  next();
}

module.exports = {
  enforceHTTPS,
  checkIfTooBusy,
};
