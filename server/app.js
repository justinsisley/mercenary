var config          = require('./config'),

    // Middleware
    logger          = require('morgan'),
    session         = require('express-session'),
    passport        = require('passport'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    errorHandler    = require('errorhandler'),
    methodOverride  = require('method-override'),
    
    // Routers
    apiRouter       = require('./routers/apiRouter'),
    userRouter      = require('./routers/userRouter'),
    authRouter      = require('./routers/authRouter'),
    catchallRouter  = require('./routers/catchallRouter'),

    // Express
    express         = require('express'),
    app             = express(),

    // Utils
    cons            = require('consolidate'),
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
    if ('development' === config.ENV || true === config.FORCE_DEV_ASSETS) {
        app.use(errorHandler());

        // When in development mode, serve static
        // content, such as JS, CSS and images.
        app.use(express.static(__dirname + '/../client'));
    }

    if (config.LOG_REQUESTS) {
        app.use(logger());
    }

    // Establish production-only settings.
    // if ('production' === config.ENV) {}

    // Instantiate the API router.
    // The user must be authenticated
    // before they can access API routes.
    // All routes in the API router will
    // be prefixed with the '/api' path.
    app.use('/api', apiRouter);

    // Instantiate the users router.
    // All routes in the user router will
    // be prefixed with the '/users' path.
    app.use('/users', userRouter);

    // Instantiate the auth router.
    // All routes in the auth router will
    // be prefixed with the '/auth' path.
    app.use('/auth', authRouter);

    // Instantiate the "catchall" router
    // after all other routes. If no previous
    // route is matched, this router will
    // serve up the application HTML file,
    // which in turn will start the
    // client-side application. The client's
    // router will take over from there.
    app.use(catchallRouter);

    // Start listening on the specified port.
    app.listen(config.PORT);

    console.log('✔'.green + '  Server is running in %s mode at ' + '%s:%d'.underline.green + '\n',
        config.ENV,
        'http://' + config.DOMAIN,
        config.PORT
    );
};