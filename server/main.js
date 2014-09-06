var mongoose    = require('mongoose');
var database    = mongoose.connection;
var app         = require('./app');
var config      = require('../config');
var databaseUri = process.env.MONGODB_URI || config.secrets.mongoDbUri;

require('colors');

if (!databaseUri) {
    console.log('\n✗'.red + '  No MongoDB database defined.');
    console.log('   Refer to ' + 'README.md'.white + ' on setting up MongoDB.\n');

    return;
}

// Initiate the DB connection
mongoose.connect(databaseUri);

// Log DB connection error
database.on('error', console.error.bind(console, 'connection error:'));

// Once the connection to the DB is
// successful, start the application.
database.once('open', app.start);

console.log('\n✔'.green + '  Connected to ' + '%s'.white, databaseUri);