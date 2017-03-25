const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const proxy = require('proxy-middleware');
const url = require('url');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const getIp = require('ip');
const chokidar = require('chokidar');
const basicAuth = require('basic-auth-connect');
const config = require('../config');
const webpackConfig = require('../config/webpack/development');

// Configurable values
const ENV = config.get('env');
const EXPRESS_PORT = config.get('expressPort');
const WEBPACK_DEV_SERVER_PORT = config.get('webpackDevServerPort');
const PROXY_API = config.get('proxyApi');
const MAX_AGE = config.get('maxAge');
const NETDATA_USERNAME = config.get('netdata').username;
const NETDATA_PASSWORD = config.get('netdata').password;

// Dev server hostname
const devServerDomain = 'http://localhost';
const devServerHost = `${devServerDomain}:${WEBPACK_DEV_SERVER_PORT}/`;

// Get local IP address
const ip = getIp.address();

// Various references to this local server
const localhost = `http://localhost:${EXPRESS_PORT}`;
const localhostIP = `http://127.0.0.1:${EXPRESS_PORT}`;
const localhostNetworkIP = `http://${ip}:${EXPRESS_PORT}`;

// References to important directories
const cwd = process.cwd();
const publicDir = path.join(cwd, './public');

// Create the Express server
const app = express();

// Logging middleware
app.use(morgan(ENV === 'development' ? 'dev' : 'combined'));
// Helmet middleware gives us some basic best-practice security
app.use(helmet());
// Gzip responses
app.use(compression());
// Parse JSON in request body
app.use(bodyParser.json());
// Validation/sanitization
app.use(expressValidator());

// Proxy requests to the remote API if one exists
if (PROXY_API) {
  // Proxy requests to any remote API
  const proxyOptions = url.parse(PROXY_API);
  proxyOptions.route = '/proxy';
  proxyOptions.rejectUnauthorized = false;
  app.use(proxy(proxyOptions));
}

// Determine if a local server exists
const localServerIndex = path.join(cwd, './server/index.js');
var localServerExists = false; // eslint-disable-line
try {
  fs.lstatSync(localServerIndex);
  localServerExists = true;
} catch (err) {} // eslint-disable-line

// Proxy requests to the local API if one exists. We're intentionally keeping
// our routes out of the try/catch, above, because we want developers' server
// code to throw errors as expected.
if (localServerExists) {
  // eslint-disable-next-line
  app.use('/api', (req, res, next) => {
    // eslint-disable-next-line
    require(localServerIndex)(req, res, next);
  });
}

// Determine if a local middleware file exists
const localMiddleware = path.join(cwd, './server/middleware.js');
var localMiddlewareExists = false; // eslint-disable-line
try {
  fs.lstatSync(localMiddleware);
  localMiddlewareExists = true;
} catch (err) {} // eslint-disable-line

// Pass the Express app to the user's custom middleware function. This allows
// the user to apply any middleware they like without having to modify the
// server entry point. Again, we're keeping this out of the try/catch (above)
// so we can maintain standard error behavior.
if (localMiddlewareExists) {
  // eslint-disable-next-line
  const runMiddleware = require(localMiddleware);

  if (typeof runMiddleware === 'function') {
    runMiddleware(app);
  } else {
    throw new Error('Custom middleware file must export a single function.');
  }
}

if (ENV === 'development') {
  // Proxy static assets to webpack-dev-server
  app.use('/', proxy(url.parse(devServerHost)));

  // Create new webpack dev server with hot reloading enabled
  const webpackDevServer = new WebpackDevServer(webpack(webpackConfig), {
    stats: 'minimal',
    publicPath: webpackConfig.output.publicPath,
    hot: true,
    historyApiFallback: true,
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
      // eslint-disable-next-line
      console.log(`\nServer module cache cleared due to change in:\n${shortPath}\n`);
    });
  });
} else {
  // Proxy static assets to the local static directory and cache them
  app.use('/', express.static(publicDir, {
    maxAge: MAX_AGE,
  }));

  // Proxy netdata path to netdata app
  app.use(
    '/_netdata',
    basicAuth(NETDATA_USERNAME, NETDATA_PASSWORD),
    proxy(url.parse('http://127.0.0.1:19999'))
  );

  // All unhandled routes are served the static index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.join(cwd, './public/index.html'));
  });
}

// Start the Express server
app.listen(EXPRESS_PORT, () => {
  // eslint-disable-next-line
  var message = `\nApplication running at:\n${localhost}\n${localhostIP}\n${localhostNetworkIP}\n`;
  // eslint-disable-next-line
  console.log(message);
  // eslint-disable-next-line
  console.log(config.doc());
});
