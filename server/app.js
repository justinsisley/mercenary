var config          = require('../config');

// Express
var express         = require('express');
var app             = express();

// Middleware
var logger          = require('morgan');
var session         = require('express-session');
var compress        = require('compression');
var passport        = require('passport');
var bodyParser      = require('body-parser');
var cookieParser    = require('cookie-parser');
var errorHandler    = require('errorhandler');
var methodOverride  = require('method-override');

// Routers
var apiRouter       = require('./routers/apiRouter');
var authRouter      = require('./routers/authRouter');
var usersRouter     = require('./routers/usersRouter');
var catchallRouter  = require('./routers/catchallRouter');

// Utils
var cons            = require('consolidate');
var memwatch;

require('colors');

// Increase the number of concurrent connections
// before additional requests are blocked.
// https://github.com/mikeal/request/issues/158
// "i'd advise against making it unlimited though, but it's possible."
// require('http').globalAgent.maxSockets = 30;

var mercenary = {
    start: function() {
        // Log memory leaks and garbage collection
        // events to the console using Memwatch
        var loggingEnabled = (config.settings.logging.memory ||
                            config.settings.logging.garbage);

        if (loggingEnabled) {
            memwatch = require('memwatch');

            // Log memory leaks
            if (config.settings.logging.memory) {
                memwatch.on('leak', function(info) {
                    console.log('memwatch:leak', info);
                });
            }

            // Log garbage collection events
            if (config.settings.logging.garbage) {
                memwatch.on('stats', function(stats) {
                    console.log('memwatch:garbage', stats);
                });
            }
        }

        // Parses the Cookie header field and populates
        // req.cookies with an object keyed by the cookie names
        app.use(cookieParser());

        // Establish a session secret token.
        /*
        http://engineering.linkedin.com/nodejs/blazing-fast-nodejs-10-performance-tips-linkedin-mobile
        By default, session data is stored in memory, which can add significant overhead to the server, especially as the number of users grows. You could switch to an external session store, such as MongoDB or Redis, but then each request incurs the overhead of a remote call to fetch session data. Where possible, the best option is to store no state on the server-side at all. Go session free by NOT including the express config above and you'll see better performance.

        Also... http://bocoup.com/weblog/node-stress-test-analysis/
        There’s a catch, though: distributing across cores means spawning multiple processes, each with its own memory space. If your application uses in-memory storage for global state, spawning across processes will require some re-structuring.

        ... so having sessions stored in-memory won't work when scaled to multiple processes.
         */
        app.use(session({
            key: 'mercenary.sid',
            secret: process.env.SESSION_SECRET || config.secrets.sessionSecret
        }));

        // Request body parsing middleware supporting JSON,
        // urlencoded, and multipart requests
        app.use(bodyParser());

        // Simulate DELETE and PUT
        app.use(methodOverride());

        // Passport authentication
        app.use(passport.initialize());
        app.use(passport.session());

        // Use consolidate to make Dust work
        // seamlessly with Express.
        app.engine('dust', cons.dust);

        // Tell Express that we're using Dust.
        app.set('view engine', 'dust');

        // Tell Express where to find Dust templates.
        app.set('views', __dirname + '/dust');

        // Establish development-only settings.
        var devEnvironment = ('development' === config.settings.env ||
                            'development' === process.env.NODE_ENV ||
                            true === config.settings.forceDev);

        if (devEnvironment) {
            app.use(errorHandler());

            // When in development mode, serve static
            // content, such as JS, CSS and images.
            app.use(express.static(__dirname + '/../client'));
        }

        if (config.settings.logging.requests) {
            app.use(logger());
        }

        // Establish production-only settings.
        // if ('production' === config.settings.env) {}

        // Instantiate the API router.
        // The user must be authenticated
        // before they can access API routes.
        // All routes in the API router will
        // be prefixed with the '/api' path.
        app.use('/api', apiRouter);

        // Instantiate the users router.
        // All routes in the user router will
        // be prefixed with the '/users' path.
        app.use('/users', usersRouter);

        // Instantiate the auth router.
        // All routes in the auth router will
        // be prefixed with the '/auth' path.
        app.use('/auth', authRouter);

        // Compress responses with Gzip.
        // This is placed further down the
        // stack intentionally to avoid
        // gzipping static assets used during
        // development.
        app.use(compress());

        // Instantiate the "catchall" router
        // after all other routes. If no previous
        // route is matched, this router will
        // serve up the application HTML file,
        // which in turn will start the
        // client-side application. The Backbone
        // router will take over from there.
        app.use(catchallRouter);

        // Start listening on the specified port.
        app.listen(process.env.PORT || config.settings.port);

        var serverUri = 'http://' + ('development' === config.settings.env ? '127.0.0.1' : config.settings.domain);
        var serverPort = (process.env.PORT || config.settings.port);

        console.log('✔'.green + '  Server is running in %s mode at ' + '%s:%d'.underline.green + '\n',
            config.settings.env,
            serverUri,
            serverPort
        );

        // Make the configured Express app a
        // property of our app object. It
        // has some useful methods that we can
        // leverage across the application.
        mercenary.app = app;
    }
};

module.exports = mercenary;