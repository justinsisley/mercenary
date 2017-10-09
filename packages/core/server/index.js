const path = require('path');
const url = require('url');
const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
const WinstonCloudwatch = require('winston-cloudwatch');
const protect = require('@risingstack/protect');
const RateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const proxy = require('proxy-middleware');
const getIp = require('ip');
const basicAuth = require('basic-auth-connect');
const toobusy = require('toobusy-js');
const config = require('../config');
const middleware = require('./middleware');
const utils = require('./utils');

// Configurable values
const ENV = config.env;
const EXPRESS_PORT = config.expressPort;
const CLOUDWATCH = config.cloudwatch;
const NETDATA_USERNAME = config.netdata.username;
const NETDATA_PASSWORD = config.netdata.password;

// Various references to this local server
const localhost = `http://localhost:${EXPRESS_PORT}`;
const localhostIP = `http://127.0.0.1:${EXPRESS_PORT}`;
const localhostNetworkIP = `http://${getIp.address()}:${EXPRESS_PORT}`;

// References to important files and directories
const cwd = process.cwd();
const publicDir = path.join(cwd, './public');
const staticPaths = require(path.join(cwd, 'config.js')).static;
const publicIndexPath = path.join(cwd, './public/index.html');
const staticPublicIndexPath = path.join(cwd, './public/static/index.html');

// Create a lookup for static page paths so we don't have to do it at response time
const staticPathLookup = {};
if (staticPaths) {
  staticPaths.forEach((staticPath) => {
    // root path is handled separately
    if (staticPath !== '/') {
      const fileName = staticPath.replace('/', '');

      staticPathLookup[staticPath] = path.join(cwd, `./public/static/${fileName}.html`);
    }
  });
}

// Configure logging transports
const winstonTransports = [
  new winston.transports.Console({ colorize: true }),
];

// Add CloudWatch transport in production if configured
if (
  ENV === 'production' &&
  CLOUDWATCH.region &&
  CLOUDWATCH.accessKeyId &&
  CLOUDWATCH.secretAccessKey &&
  CLOUDWATCH.logGroupName
) {
  // Capture a server start time to separate log streams by server start date
  const serverStartTime = new Date().toISOString();

  winstonTransports.push(
    new WinstonCloudwatch({
      logGroupName: CLOUDWATCH.logGroupName,
      logStreamName() {
        // Spread log streams across dates as the server stays up
        const date = new Date().toISOString().split('T')[0];

        return `${serverStartTime}__${date}`;
      },
      awsRegion: CLOUDWATCH.region,
      jsonMessage: true,
    }),
  );
}

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
// Request logging
app.use(expressWinston.logger({
  transports: winstonTransports,
  msg: '{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
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
  // If in production or local mode, and the index page is a static path,
  // send the static version
  if (
    (ENV === 'production' || ENV === 'local') &&
    staticPaths &&
    staticPaths.indexOf('/') > -1
  ) {
    app.get('/', (req, res) => {
      res.sendFile(staticPublicIndexPath);
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

  // All unhandled routes are served the static index.html file
  app.get('*', (req, res) => {
    // If in production mode, and the page is a static path, send the static version
    if (ENV === 'production' && staticPathLookup[req.url]) {
      res.sendFile(staticPathLookup[req.url]);
    } else {
      res.sendFile(publicIndexPath);
    }
  });
}

// Error logging
app.use(expressWinston.errorLogger({ transports: winstonTransports }));

// Start the Express server
const server = app.listen(EXPRESS_PORT, () => {
  console.log(`\nApplication running at:\n${localhost}\n${localhostIP}\n${localhostNetworkIP}\n`);
});

// Handle exit signal
process.on('SIGINT', () => {
  server.close();
  toobusy.shutdown();
  process.exit();
});
