/* eslint-disable import/no-unresolved */
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
const utils = require('../utils');
const config = require('../config');
const middleware = require('./middleware');

const {
  env: ENV,
  expressPort: EXPRESS_PORT,
  NETDATA_USERNAME,
  NETDATA_PASSWORD,
  STORYBOOK_USERNAME,
  STORYBOOK_PASSWORD,
} = config;

// Various references to this local server
const localhost = `http://localhost:${EXPRESS_PORT}`;
const localhostIP = `http://127.0.0.1:${EXPRESS_PORT}`;
const localhostNetworkIP = `http://${getIp.address()}:${EXPRESS_PORT}`;

// References to important files and directories
const cwd = process.cwd();
const staticPaths = config.static;
const staticDir = path.join(cwd, './public/static');
const storybookDir = path.join(cwd, './public/storybook');

// Pre-read and cache static pages
let staticPageCache = {};
if (ENV === 'production' || ENV === 'local') {
  staticPageCache = utils.createStaticPageCache();
}

// Configure logging transports
const winstonTransports = [
  new winston.transports.Console(),
];

// Add CloudWatch transport in production if configured
if (ENV === 'production') {
  winstonTransports.push(new WinstonCloudwatch({
    logGroupName: `${config.AWS_APP_NAME}_${config.AWS_ENV_NAME}`,
    logStreamName() {
      // Spread log streams across dates as the server stays up
      return new Date().toISOString().split('T')[0];
    },
    awsRegion: config.AWS_REGION,
    awsAccessKeyId: config.AWS_ACCESS_KEY_ID,
    awsSecretKey: config.AWS_SECRET_ACCESS_KEY,
    jsonMessage: true,
  }));
}

// Create the Express server
const app = express();

// Trust the left-most entry in the X-Forwarded-* header
app.enable('trust proxy');

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
  // eslint-disable-next-line global-require
  const runMiddleware = require(path.join(cwd, middlewarePath));

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
    // eslint-disable-next-line global-require
    require(path.join(cwd, localServerPath))(req, res, next);
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
  app.use('/static', express.static(staticDir, {
    maxAge: '365 days',
  }));

  // Keep the public index page in memory to prevent re-reading it from disk
  // on each request
  const publicIndexFile = utils.readFileSync(path.join(cwd, './public/index.html'));

  // If in production or local mode, and the index page is a static path,
  // send the static version
  if (
    (ENV === 'production' || ENV === 'local') &&
    staticPaths &&
    staticPaths.indexOf('/') > -1
  ) {
    app.get('/', (req, res) => {
      res.send(staticPageCache.index);
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
      staticPageCache[req.originalUrl]
    ) {
      res.send(staticPageCache[req.originalUrl]);
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
  // eslint-disable-next-line global-require
  const errorHandler = require(path.join(cwd, errorHandlerPath));

  if (typeof errorHandler === 'function') {
    app.use(errorHandler);
  } else {
    throw new Error('Custom error handler file must export a single function.');
  }
}

// Start the Express server
const server = app.listen(EXPRESS_PORT, () => {
  console.log(`\nServer running at:\n${localhost}\n${localhostIP}\n${localhostNetworkIP}\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  utils.gracefulShutdown(server, toobusy);
});
