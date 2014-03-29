var packageJSON = require('../package.json'),
    express     = require('express'),
    http        = require('http'),
    cons        = require('consolidate'),
    config      = require('./config'),
    app         = express(),
    passport    = require('passport'),
    memwatch;

module.exports = function() {
    // Log memory leaks and garbage collection
    // events to the console using Memwatch
    if (config.LOG_LEAKS || config.LOG_GARBAGE) {
        memwatch = require('memwatch');

        // Log memory leaks
        if (config.LOG_LEAKS) {
            memwatch.on('leak', function(info) {
                console.log('memwatch:leak', info);
            });
        }

        // Log garbage collection events
        if (config.LOG_GARBAGE) {
            memwatch.on('stats', function(stats) {
                console.log('memwatch:garbage', stats);
            });
        }
    }

    app.configure(function() {
        // Parses the Cookie header field and populates
        // req.cookies with an object keyed by the cookie names
        app.use(express.cookieParser());

        // Establish a session secret token.
        app.use(express.session({secret: config.SESSION_SECRET}));

        // Request body parsing middleware supporting JSON,
        // urlencoded, and multipart requests
        app.use(express.bodyParser());

        // Simulate DELETE and PUT
        app.use(express.methodOverride());

        // Passport authentication
        app.use(passport.initialize());
        app.use(passport.session());

        // Use consolidate to make Dust work
        // seamlessly with Express.
        app.engine('dust', cons.dust);

        // Tell Express that we're using Dust.
        app.set('view engine', 'dust');

        // Tell Express where to find Dust templates
        app.set('views', __dirname + '/dust');

        // Establish some development-only settings.
        if ('development' === config.ENV) {
            app.use(express.errorHandler());

            app.use(express.logger());

            // When in development mode, serve static
            // content, such as JS, CSS and images.
            app.use(express.static(__dirname + '/../client'));
        }

        // Establish production-only settings.
        // if ('production' === config.ENV) {}

        // Handle requests using routers.
        app.use(app.router);

        // Instantiate the base router by passing it a
        // reference to the Express application.
        require('./routers/baseRouter').router(app);
    });

    // Create the HTTP server and listen on the configured   port.
    http.createServer(app).listen(config.PORT, function() {
        console.log('\n✔ %s is running in %s mode at %s:%d\n', packageJSON.name, config.ENV, config.WWW_ADDRESS, config.PORT);
    });
};