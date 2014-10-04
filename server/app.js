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

// Routers
var apiRouter       = require('./routers/api');
var authRouter      = require('./routers/auth');
var usersRouter     = require('./routers/users');
var proxyRouter     = require('./routers/proxy');
var catchallRouter  = require('./routers/catchall');

// Utils
var cons            = require('consolidate');

// Constants
var env             = require('./constants/env');

require('colors');

// https://github.com/mikeal/request/issues/158
// http://qzaidi.github.io/2013/07/20/surprises/
require('http').globalAgent.maxSockets = 25;

var mercenary = {
    start: function() {
        // Parses the Cookie header field and populates
        // req.cookies with an object keyed by the cookie names
        app.use(cookieParser());

        // Session data.
        app.use(session({
            key: 'mercenary.sid',
            secret: process.env.SESSION_SECRET || config.secrets.sessionSecret,
            resave: false,
            saveUninitialized: true,
            cookie: {httpOnly: true}
        }));

        // Body parser middleware.
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

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

        if (env.IS_DEV) {
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

        // Instantiate the proxy router.
        // In real-world scenarios, this will
        // probably proxy requests to a dedicated
        // API server and allow you to make
        // cross-origin requests without having
        // to set up CORS. You would probably end
        // up removing the API router above and
        // using this as your "/api" route handler.
        app.use('/proxy', proxyRouter);

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
        app.listen(env.PORT);

        console.log('✔'.green + '  Server is running in %s mode at ' + '%s'.underline.green + '\n',
            config.settings.env,
            env.SERVER_URL
        );

        // Make the configured Express app a
        // property of our app object. It
        // has some useful methods that we can
        // leverage across the application.
        mercenary.app = app;
    }
};

module.exports = mercenary;