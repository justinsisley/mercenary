var config      = require('./config'),
    app         = require('./app'),
    mongoose    = require('mongoose'),
    db          = mongoose.connection;

// If we have a MongoDB database to work with,
// start the application under that pretense.
// If we don't, start the application using
// local object storage, which means no data
// will be persisted, which in turn means
// there is no sign-up and log-in functionality.
if (config.DB_URI) {
    // Initiate the DB connection
    mongoose.connect(config.DB_URI);

    // Log DB connection error
    db.on('error', console.error.bind(console, 'connection error:'));

    // Once the connection to the DB is
    // successful, start the application.
    db.once('open', app);
    
    console.log('connected to ' + config.DB_URI);
} else {
    // Start the application without a
    // remote database, and no sign-up
    // or log-in functionality.
    app();
}