var config = require('../config');
require('colors');

// If there's no MongoDB database defined,
// we fall back to a local implementation.
// Learn how: https://github.com/sergeyksv/tungus
if (!process.env.MONGOLAB_URI && !config.secrets.mongoDbUri) {
    require('tungus');

    config.secrets.mongoDbUri = 'tingodb://' + __dirname + '/data';
    console.log('\n✗'.red + '  No MongoDB database defined. Using TingoDB.');
}

var app = require('./app'),
    mongoose = require('mongoose'),
    db = mongoose.connection;

// Initiate the DB connection
mongoose.connect(process.env.MONGOLAB_URI || config.secrets.mongoDbUri);

// Log DB connection error
db.on('error', console.error.bind(console, 'connection error:'));

// Once the connection to the DB is
// successful, start the application.
db.once('open', app.start);

console.log('✔'.green + '  Connected to "%s"', process.env.MONGOLAB_URI || config.secrets.mongoDbUri);