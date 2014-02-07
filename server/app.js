var packageJSON = require('../package.json'),
    express     = require('express'),
    http        = require('http'),
    cons        = require('consolidate'),
    config      = require('./config'),
    app         = express(),
    passport    = require('passport'),
    hostname    = require('os').hostname(),
    memwatch;

module.exports = function() {
    'use strict';

    // Log memory leaks and garbage collection
    // events to the console using Memwatch
    if (config.LOG_LEAKS || config.LOG_GARBAGE) {
        memwatch = require('memwatch');

        // Log memory leaks
        if (config.LOG_LEAKS) {
            memwatch.on('leak', function(info) {
                console.log('Memwatch:leak', info);
            });
        }

        // Log garbage collection events
        if (config.LOG_GARBAGE) {
            memwatch.on('stats', function(stats) {
                console.log('Memwatch:garbage', stats);
            });
        }
    }

    app.configure(function() {
        // Parses the Cookie header field and populates
        // req.cookies with an object keyed by the cookie names
        app.use(express.cookieParser());

        // Establish a session secret token
        app.use(express.session({secret: 'you need to change this value'}));

        // Request body parsing middleware supporting JSON,
        // urlencoded, and multipart requests
        app.use(express.bodyParser());

        // Simulate DELETE and PUT
        app.use(express.methodOverride());

        // Passport authentication
        app.use(passport.initialize());
        app.use(passport.session());

        // Set the directory where the server will
        // look for Dust.js templates
        app.set('views', __dirname + '/dust');

        // Use Consolidate to shim Dust for use
        // with Express
        app.engine('.dust', cons.dust);

        // Tell Express which templating engine
        // we're going to be using
        app.set('view engine', 'dust');

        if ('development' === config.ENV) {
            app.use(express.errorHandler());

            app.use(express.logger());

            // When in development mode, serve static
            // content, such as JS, CSS and images.
            app.use(express.static(__dirname + '/../client'));
        }

        if ('production' === config.ENV) {}

        // Handle requests using routers.
        app.use(app.router);

        // Instantiate the base router by passing it a
        // reference to the Express application.
        require('./routers/baseRouter').router(app);
    });

    // Create the HTTP server and listen on the configured port.
    http.createServer(app).listen(config.PORT, function() {
        console.log(packageJSON.name + ' running in ' + config.ENV + ' mode at ' + hostname + ':' + config.PORT);
    });
};