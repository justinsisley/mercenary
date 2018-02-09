/* eslint-disable import/no-unresolved */

const fs = require('fs');
const path = require('path');
const url = require('url');
const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
const WinstonCloudwatch = require('winston-cloudwatch');
const helmet = require('helmet');
const RateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const proxy = require('proxy-middleware');
const getIp = require('ip');
const basicAuth = require('basic-auth-connect');
const toobusy = require('toobusy-js');
const gracefulExit = require('express-graceful-exit');
const config = require('../config');
const middleware = require('./middleware');
const utils = require('./utils');

// Configurable values
const ENV = config.env;
const EXPRESS_PORT = config.expressPort;
const CLOUDWATCH = config.cloudwatch;
const NETDATA_USERNAME = config.netdata.username;
const NETDATA_PASSWORD = config.netdata.password;
const STORYBOOK_USERNAME = config.storybook.username;
const STORYBOOK_PASSWORD = config.storybook.password;

// Various references to this local server
const localhost = `http://localhost:${EXPRESS_PORT}`;
const localhostIP = `http://127.0.0.1:${EXPRESS_PORT}`;
const localhostNetworkIP = `http://${getIp.address()}:${EXPRESS_PORT}`;

// References to important files and directories
const cwd = process.cwd();
const staticDir = path.join(cwd, './public/static');
const staticPaths = require(path.join(cwd, 'config.js')).static;
const storybookDir = path.join(cwd, './public/storybook');

// Create a lookup for static pages so we don't have to read them from disk
// on each request
const staticPageLookup = {};
if (
  (ENV === 'production' || ENV === 'local') &&
  staticPaths
) {
  staticPaths.forEach((staticPath) => {
    let pathName = staticPath;
    let fileName = staticPath.replace('/', '');

    if (staticPath === '/') {
      pathName = 'index';
      fileName = 'index';
    }

    staticPageLookup[pathName] = fs.readFileSync(
      path.join(cwd, `./public/pages/${fileName}.html`),
      { encoding: 'utf8' }
    );
  });
}

// Configure logging transports
const winstonTransports = [
  new winston.transports.Console(),
];

// Add CloudWatch transport in production if configured
if (
  ENV === 'production' &&
  CLOUDWATCH.region &&
  CLOUDWATCH.accessKeyId &&
  CLOUDWATCH.secretAccessKey &&
  CLOUDWATCH.logGroupName
) {
  winstonTransports.push(
    new WinstonCloudwatch({
      logGroupName: CLOUDWATCH.logGroupName,
      logStreamName() {
        // Spread log streams across dates as the server stays up
        return new Date().toISOString().split('T')[0];
      },
      awsRegion: CLOUDWATCH.region,
      awsAccessKeyId: CLOUDWATCH.accessKeyId,
      awsSecretKey: CLOUDWATCH.secretAccessKey,
      jsonMessage: true,
    }),
  );
}

// Create the Express server
const app = express();

// Trust the left-most entry in the X-Forwarded-* header
app.enable('trust proxy');

// Graceful shutdown
app.use(gracefulExit.middleware(app));

// Parse JSON in request body
app.use(bodyParser.json());

// Helmet middleware gives us some basic best-practice security
app.use(helmet());

// Validation/sanitization
app.use(expressValidator());

// Request logging
app.use(expressWinston.logger({
  transports: winstonTransports,
  msg: '{{req.method}} {{req.originalUrl}} {{res.statusCode}} {{res.responseTime}}ms',
  colorize: true,
  meta: ENV === 'production',
  expressFormat: ENV === 'production',
}));

// Production middleware
if (ENV === 'production') {
  // Rate limiting
  app.use(new RateLimit({
    delayMs: 0, // disable delay
    max: 1000, // requests per `windowMs`
    windowMs: 60 * 1000, // 1 minute
  }));

  // Gracefully handle server overload
  app.use(middleware.checkIfTooBusy);

  // Force HTTPS, and optionally force www
  app.use(middleware.enforceHTTPS);
}

// Maintenance mode
if (process.env.MAINTENANCE) {
  app.use('/api/*', middleware.maintenanceApiResponse);
  app.use(/^\/(?!(js|css|images|fonts|icons)).*$/, middleware.maintenancePageResponse);
}

// Pass the Express app to the user's custom middleware function. This allows
// the user to apply any middleware they like without having to modify the
// server entry point. Again, we're keeping this out of the try/catch (above)
// so we can maintain standard error behavior.
const middlewarePath = './server/middleware.js';
if (utils.fileExists(middlewarePath)) {
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
if (utils.fileExists(localServerPath)) {
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
  // Proxy static assets to the public/static directory
  app.use('/static', express.static(staticDir));

  // Keep the public index page in memory to prevent re-reading it from disk
  // on each request
  const publicIndexFile = fs.readFileSync(
    path.join(cwd, './public/index.html'),
    { encoding: 'utf8' }
  );

  // If in production or local mode, and the index page is a static path,
  // send the static version
  if (
    (ENV === 'production' || ENV === 'local') &&
    staticPaths &&
    staticPaths.indexOf('/') > -1
  ) {
    app.get('/', (req, res) => {
      res.send(staticPageLookup.index);
    });
  }

  // Proxy netdata path to netdata app
  app.use(
    '/_netdata',
    basicAuth(NETDATA_USERNAME, NETDATA_PASSWORD),
    proxy(url.parse('http://127.0.0.1:19999'))
  );

  console.log(`\nnetdata credentials\nusername: ${NETDATA_USERNAME}\npassword: ${NETDATA_PASSWORD}`);

  // Proxy storybook path to static storybook files
  app.use(
    '/_storybook',
    basicAuth(STORYBOOK_USERNAME, STORYBOOK_PASSWORD),
    express.static(storybookDir)
  );

  console.log(`\nstorybook credentials\nusername: ${STORYBOOK_USERNAME}\npassword: ${STORYBOOK_PASSWORD}`);

  // All unhandled routes are served the static index.html file
  app.get('*', (req, res) => {
    // If in production or local mode, and the page is a static path, send the static version
    if (
      (ENV === 'production' || ENV === 'local') &&
      staticPageLookup[req.originalUrl]
    ) {
      res.send(staticPageLookup[req.originalUrl]);
    } else {
      res.send(publicIndexFile);
    }
  });
}

// Error logging
app.use(expressWinston.errorLogger({ transports: winstonTransports }));

// Pass the Express app to the user's custom error handler function.
const errorHandlerPath = './server/errorHandler.js';
if (utils.fileExists(errorHandlerPath)) {
  const errorHandler = require(path.join(cwd, errorHandlerPath)); // eslint-disable-line

  if (typeof errorHandler === 'function') {
    app.use(errorHandler);
  } else {
    throw new Error('Custom error handler file must export a single function.');
  }
}

// Start the Express server
const server = app.listen(EXPRESS_PORT, () => {
  console.log(`\nApplication running at:\n${localhost}\n${localhostIP}\n${localhostNetworkIP}\n`);
});

// Graceful shutdown
function handleExit() {
  toobusy.shutdown();

  gracefulExit.gracefulExitHandler(app, server);
}

process.on('SIGINT', handleExit);
process.on('SIGTERM', handleExit);
