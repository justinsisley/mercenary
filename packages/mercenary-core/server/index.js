const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const protect = require('@risingstack/protect');
const RateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const proxy = require('proxy-middleware');
const url = require('url');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const getIp = require('ip');
const chokidar = require('chokidar');
const basicAuth = require('basic-auth-connect');
const webpackConfig = require('../config/webpack/development');
const config = require('../config');

// Configurable values
const ENV = config.env;
const EXPRESS_PORT = config.expressPort;
const WWW = config.www;
const WEBPACK_DEV_SERVER_PORT = config.webpackDevServerPort;
const NETDATA_USERNAME = config.netdata.username;
const NETDATA_PASSWORD = config.netdata.password;

// Dev server hostname
const devServerDomain = 'http://localhost';
const devServerHost = `${devServerDomain}:${WEBPACK_DEV_SERVER_PORT}/`;

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

// In production environment, force HTTPS, and optionally www
// if (ENV === 'production') {
//   app.use('*', (req, res, next) => {
//     // Force www subdomain
//     if (WWW.force && req.hostname.indexOf('www.') !== 0) {
//       res.redirect(301, `https://www.${req.hostname}${req.originalUrl}`);
//       return;
//     }
//
//     console.log(WWW.force, WWW.strip, req.hostname);
//
//     // Strip www subdomain
//     if (!WWW.force && WWW.strip && req.hostname.indexOf('www.') === 0) {
//       const strippedHostname = req.hostname.replace(/^www\./, '');
//       console.log(strippedHostname);
//       console.log(`https://${strippedHostname}${req.originalUrl}`);
//       res.redirect(301, `https://${strippedHostname}${req.originalUrl}`);
//       return;
//     }
//
//     if (req.secure && req.headers['x-forwarded-proto'] === 'https') {
//       next();
//       return;
//     }
//
//     res.redirect(301, `https://${req.hostname}${req.originalUrl}`);
//   });
// }

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

  // Only use rate limiting in production environment
  if (ENV === 'production') {
    app.use('/api', new RateLimit({
      delayMs: 0, // disable delay
      max: 1000, // requests per `windowMs`
      windowMs: 60 * 1000, // 1 minute
    }), apiHandler);
  } else {
    app.use('/api', apiHandler);
  }
}

// Development environment configuration
if (ENV === 'development') {
  // Proxy static assets to webpack-dev-server
  app.use('/', proxy(url.parse(devServerHost)));

  // Create new webpack dev server with hot reloading enabled
  const webpackDevServer = new WebpackDevServer(webpack(webpackConfig), {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: true,
    hot: true,
    // More minimal logging than the "minimal" setting
    stats: {
      assets: false,
      cached: false,
      cachedAssets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      hash: false,
      maxModules: 0,
      modules: false,
      moduleTrace: false,
      performance: false,
      publicPath: false,
      reasons: false,
      source: false,
      timings: false,
      version: false,
    },
  });

  // Start the webpack dev server
  webpackDevServer.listen(WEBPACK_DEV_SERVER_PORT);

  // Do "hot-reloading" of express stuff on the server
  // Throw away cached modules and re-require next time
  // Ensure there's no important state in there!
  const watcher = chokidar.watch(path.join(cwd, './server'));

  watcher.on('ready', () => {
    watcher.on('all', (eventName, filePath) => {
      Object.keys(require.cache).forEach((id) => {
        if (/\/server\//.test(id)) {
          delete require.cache[id];
        }
      });

      const shortPath = filePath.replace(cwd, '');
      console.log(`\nModule cache cleared due to change in:\n${shortPath}\n`);
    });
  });
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
