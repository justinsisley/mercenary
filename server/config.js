/**
 * The primary server configuration file is set
 * up to work nicely with Heroku right out of
 * the box. While these properties are used across
 * the server, they can get their values any way
 * you'd like, so you're certainly not tied to
 * any particular hosting provider.
 */
var packageJSON = require('../package.json'),
    hostname    = require('os').hostname();

module.exports = {
    PORT: process.env.PORT || 8743,
    ENV: process.env.ENV || 'development',

    WWW_ADDRESS: (function() {
        // If we're in a development environment, construct
        // the application's web address at run time based
        // on the system's host name and the port setting.
        if (!process.env.ENV || process.env.ENV === 'development') {
            return 'http://' + hostname + ':' + module.exports.PORT;
        }

        // If we're not in development, use the home page
        // property in the package.json file.
        return packageJSON.homepage;
    })(),

    // By default, this is configured to work out of the
    // box with Heroku and the MongoLab addon.
    DB_URI: process.env.MONGOLAB_URI || '',

    // Set up a Google Analytics and add your tracker ID
    GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS || 'UA-########-#',

    // Set up a free Mandrill account and add your API key
    MANDRILL_API_KEY: process.env.MANDRILL_APIKEY || '',

    // Toggle the logging of leaks and garbage collection activity.
    // By default, these simply log to the console.
    LOG_GARBAGE: true,
    LOG_LEAKS: true,

    // If set to true, forces client-side JavaScript to
    // load the built JavaScript file. Useful for deployment testing.
    FORCE_PRD_JAVASCRIPT: false
};