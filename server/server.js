var	express = require('express'),
	http = require('http'),
	cons = require('consolidate'),
	config = require('./config'),
	server = express(),
	memwatch;

// Log memory leaks and garbage collection
// events to the console using Memwatch
if (config.LOG_LEAKS || config.LOG_GARBAGE) {
	memwatch = require('memwatch');

	// Log memory leaks
	if (config.LOG_LEAKS) {
		memwatch.on('leak', function(info) {
			'use strict';
			
			console.log('Memwatch:leak', info);
		});
	}

	// Log garbage collection events
	if (config.LOG_GARBAGE) {
		memwatch.on('stats', function(stats) {
			'use strict';

			console.log('Memwatch:garbage', stats);
		});
	}
}

// Set the directory where the server will
// look for Dust.js templates
server.set('views', __dirname + '/dust');

// Use Consolidate to shim Dust for use
// with Express
server.engine('.dust', cons.dust);

// Tell Express which templating engine
// we're going to be using
server.set('view engine', 'dust');

// Enables reverse proxy support
server.enable('trust proxy');

// Parses the Cookie header field and populates
// req.cookies with an object keyed by the cookie names
server.use(express.cookieParser());

// Request body parsing middleware supporting JSON,
// urlencoded, and multipart requests
server.use(express.bodyParser());

// Simulate DELETE and PUT
server.use(express.methodOverride());

if ('development' === config.ENV) {
	server.use(express.errorHandler());

	server.use(express.logger());

	// When in development mode, serve static content,
	// such as JS, CSS and images
	server.use(express.static(__dirname + '/../client'));
}

if ('production' === config.ENV) {}

server.use(server.router);

// Instantiate the router by passing it a reference to the Express application
require('./routers/appRouter').router(server);


// Create the HTTP server and listen on the defined Port
http.createServer(server).listen(config.PORT, function() {
	'use strict';

	console.log('Application running in ' + config.ENV + ' mode on port ' + config.PORT);
});