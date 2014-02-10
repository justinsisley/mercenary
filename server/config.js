/**
 * The primary server configuration file is set
 * up to work nicely with Heroku right out of
 * the box. While these properties are used across
 * the server, they can get their values any way
 * you'd like, so you're certainly not tied to
 * any particular hosting provider.
 *
 * Some configurations are dynamic, so package.json
 * and the "os" module are used to help figure some
 * things out.
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

    // Toggle the logging of leaks and garbage collection activity.
    // By default, these simply log to the console.
    LOG_GARBAGE: true,
    LOG_LEAKS: true,

    // If set to true, forces client-side JavaScript to
    // load the built JavaScript file. Useful for deployment testing.
    FORCE_PRD_JAVASCRIPT: false,

    // Set up a Google Analytics and add your tracker ID
    GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS || 'UA-########-#',

    // Set up a free Mandrill account and add your API key
    MANDRILL_API_KEY: process.env.MANDRILL_APIKEY || '',

    // Service-based authentication.
    // Delete what you don't need. For each of the services
    // that you utilize, you'll need to create a developer
    // account and get the necessary information to fill
    // in the values below.
    AUTH_FACEBOOK: {
        CLIENT_ID: 'Your App ID',
        CLIENT_SECRET: 'Your App Secret',
        CALLBACK_URL: '/auth/facebook/callback',
        PASS_REQUEST_TO_CALLBACK: true
    },

    AUTH_TWITTER: {
        CONSUMER_KEY: 'Your Consumer Key',
        CONSUMER_SECRET: 'Your Consumer Secret',
        CALLBACK_URL: '/auth/twitter/callback',
        PASS_REQUEST_TO_CALLBACK: true
    },
    
    AUTH_GOOGLE: {
        CLIENT_ID: 'Your Client ID',
        CLIENT_SECRET: 'Your Client Secret',
        CALLBACK_URL: '/auth/google/callback',
        PASS_REQUEST_TO_CALLBACK: true
    },
    
    AUTH_GITHUB: {
        CLIENT_ID: 'Your Client ID',
        CLIENT_SECRET: 'Your Client Secret',
        CALLBACK_URL: '/auth/github/callback',
        PASS_REQUEST_TO_CALLBACK: true
    }
};