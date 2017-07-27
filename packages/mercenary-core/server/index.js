const fs = require('fs');
const path = require('path');
const url = require('url');
const express = require('express');
const morgan = require('morgan');
const protect = require('@risingstack/protect');
const RateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const proxy = require('proxy-middleware');
const getIp = require('ip');
const basicAuth = require('basic-auth-connect');
const config = require('../config');

// Configurable values
const ENV = config.env;
const EXPRESS_PORT = config.expressPort;
const HOSTNAME = config.hostname;
const WWW = config.www;
const AUTH = config.auth;
const NETDATA_USERNAME = config.netdata.username;
const NETDATA_PASSWORD = config.netdata.password;

// Various references to this local server
const localhost = `http://localhost:${EXPRESS_PORT}`;
const localhostIP = `http://127.0.0.1:${EXPRESS_PORT}`;
const localhostNetworkIP = `http://${getIp.address()}:${EXPRESS_PORT}`;

// References to important directories
const cwd = process.cwd();
const publicDir = path.join(cwd, './public');
const staticPaths = require(path.join(cwd, 'config.js')).static;

// Create the Express server
const app = express();
// Trust the left-most entry in the X-Forwarded-* header
app.enable('trust proxy');
// Parse JSON in request body
app.use(bodyParser.json());
// Helmet middleware gives us some basic best-practice security
app.use(protect.express.headers());
// Protect against XSS attacks
app.use(protect.express.xss());
// Validation/sanitization
app.use(expressValidator());
// Logging middleware
app.use(morgan(ENV === 'development' ? 'dev' : 'combined'));

// Helper that determines if a file relative to the host project's path exists
function fileExists(pathname) {
  try {
    fs.lstatSync(path.join(cwd, pathname));
    return true;
  } catch (err) {
    return false;
  }
}

// Production middleware
if (ENV === 'production') {
  // Force HTTPS, and optionally www
  app.use('*', (req, res, next) => {
    let hostname = HOSTNAME;

    // Prevent hostname spoofing
    if (req.hostname.indexOf(hostname) === -1) {
      res.sendStatus(403);
      return;
    }

    if (WWW.force) {
      hostname = `www.${hostname}`;
    }

    const finalUrl = `https://${hostname}${req.originalUrl}`;
    const hasWWW = req.hostname.indexOf('www.') === 0;
    const isSecure = req.secure && req.headers['x-forwarded-proto'] === 'https';

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

    // Redirect HTTP to HTTPS
    if (!isSecure) {
      res.redirect(301, finalUrl);
      return;
    }

    next();
  });

  // Rate limiting
  app.use(new RateLimit({
    delayMs: 0, // disable delay
    max: 1000, // requests per `windowMs`
    windowMs: 60 * 1000, // 1 minute
  }));
}

// Pass the Express app to the user's custom middleware function. This allows
// the user to apply any middleware they like without having to modify the
// server entry point. Again, we're keeping this out of the try/catch (above)
// so we can maintain standard error behavior.
const middlewarePath = './server/middleware.js';
if (fileExists(middlewarePath)) {
  const runMiddleware = require(path.join(cwd, middlewarePath)); // eslint-disable-line

  if (typeof runMiddleware === 'function') {
    runMiddleware(app);
  } else {
    throw new Error('Custom middleware file must export a single function.');
  }
}

// Proxy requests to the local API if one exists. We're intentionally keeping
// our routes out of the try/catch, above, because we want developers' server
// code to throw errors as expected.
const localServerPath = './server/index.js';
if (fileExists(localServerPath)) {
  const apiHandler = (req, res, next) => {
    require(path.join(cwd, localServerPath))(req, res, next); // eslint-disable-line
  };

  app.use('/api', apiHandler);
}

if (ENV === 'development') {
  // requiring this only if it's a dev environment means production environments
  // do not need to depend on webpack at all.
  // eslint-disable-next-line
  const devServer = require('./dev');

  // Initialize development server
  devServer(app);
// Non-development environment configuration
} else {
  // If in production mode, and the index page is a static path, send the static version
  if (
    ENV === 'production' &&
    staticPaths &&
    staticPaths.indexOf('/') > -1
  ) {
    app.get('/', (req, res) => {
      res.sendFile(path.join(cwd, './public/static/index.html'));
    });
  }

  // Proxy static assets to the public directory
  app.use('/', express.static(publicDir));

  // Proxy netdata path to netdata app
  app.use(
    '/_netdata',
    basicAuth(NETDATA_USERNAME, NETDATA_PASSWORD),
    proxy(url.parse('http://127.0.0.1:19999'))
  );

  console.log(`\nnetdata credentials\nusername: ${NETDATA_USERNAME}\npassword: ${NETDATA_PASSWORD}`);

  // Optional HTTP auth
  if (ENV === 'production' && AUTH.username && AUTH.password) {
    app.use(basicAuth(AUTH.username, AUTH.password));
  }

  // All unhandled routes are served the static index.html file
  app.get('*', (req, res) => {
    // If in production mode, and the index page is a static path, send the static version
    if (
      ENV === 'production' &&
      staticPaths &&
      staticPaths.indexOf(req.url) > -1
    ) {
      const fileName = req.url.replace('/', '');

      res.sendFile(path.join(cwd, `./public/static/${fileName}.html`));
    } else {
      res.sendFile(path.join(cwd, './public/index.html'));
    }
  });
}

// Start the Express server
app.listen(EXPRESS_PORT, () => {
  console.log(`\nApplication running at:\n${localhost}\n${localhostIP}\n${localhostNetworkIP}\n`);
});
