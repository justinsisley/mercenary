var config = require('./config'),
    app = require('./app');
    
require('colors');

// If there's no MongoDB database defined,
// we fall back to a local implementation.
// Learn how: https://github.com/sergeyksv/tungus
if (!config.DB_URI) {
    require('tungus');

    config.DB_URI = 'tingodb://' + __dirname + '/data';
    console.log('\n✗'.red + '  No MongoDB database defined. Using TingoDB.');
}

var mongoose = require('mongoose'),
    db = mongoose.connection;

// Initiate the DB connection
mongoose.connect(config.DB_URI);

// Log DB connection error
db.on('error', console.error.bind(console, 'connection error:'));

// Once the connection to the DB is
// successful, start the application.
db.once('open', app);

console.log('✔'.green + '  Connected to %s', config.DB_URI);