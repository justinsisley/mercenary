var packageJSON     = require('../package.json'),
    config          = require('./config'),
    cons            = require('consolidate'),
    logger          = require('morgan'),
    express         = require('express'),
    session         = require('express-session'),
    passport        = require('passport'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    errorHandler    = require('errorhandler'),
    methodOverride  = require('method-override'),
    app             = express(),
    memwatch;

require('colors');

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

    // Parses the Cookie header field and populates
    // req.cookies with an object keyed by the cookie names
    app.use(cookieParser());

    // Establish a session secret token.
    app.use(session({
        key: 'mercenary.sid',
        secret: config.SESSION_SECRET
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

    // Tell Express where to find Dust templates
    app.set('views', __dirname + '/dust');

    // Establish development-only settings.
    if ('development' === config.ENV) {
        app.use(errorHandler());
        app.use(logger());

        // When in development mode, serve static
        // content, such as JS, CSS and images.
        app.use(express.static(__dirname + '/../client'));
    }

    // Establish production-only settings.
    // if ('production' === config.ENV) {}

    // Instantiate the base router by passing it a
    // reference to the Express application.
    require('./routers/baseRouter').router(app);

    // Start listening on the specified port.
    app.listen(config.PORT);
    console.log('✔'.green + '  %s is running in %s mode at ' + '%s:%d'.underline.green + '\n',
        packageJSON.title,
        config.ENV,
        config.WWW_ADDRESS,
        config.PORT
    );
};