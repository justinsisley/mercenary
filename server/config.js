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
var packageJSON = require('../package.json');

module.exports = {
    PORT: process.env.PORT || 8743,
    ENV: process.env.ENV || 'development',

    WWW_ADDRESS: (function() {
        // If we're in a development environment, construct
        // the application's web address at run time based
        // on the system's host name and the port setting.
        if (!process.env.ENV || process.env.ENV === 'development') {
            return 'http://127.0.0.1:' + module.exports.PORT;
        }

        // If we're not in development, use the home page
        // property in the package.json file.
        // You could also hard-code this to suit your needs.
        return packageJSON.homepage;
    })(),

    // By default, this is configured to work out of the
    // box with Heroku and the MongoLab addon.
    // It's not recommended to put your MongoDB URI here
    // as a string, since it contains the username and password.
    // Instead, you should set up an environment variable for 
    // MONGOLAB_URI. Both ways work, but the environment
    // variables keeps your DB credentials out of the repository.
    DB_URI: process.env.MONGOLAB_URI || '',

    // Toggle the logging of leaks and garbage collection activity.
    // By default, these simply log to the console.
    LOG_GARBAGE: true,
    LOG_LEAKS: true,

    // If set to true, forces client-side JavaScript to
    // load the built JavaScript file. Useful for deployment testing.
    FORCE_PRD_JAVASCRIPT: false,

    // Set up a Google Analytics and add your tracker ID.
    GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS || 'UA-########-#',

    // Set up a free Mandrill account and add your API key.
    MANDRILL_API_KEY: process.env.MANDRILL_APIKEY || '',

    // Service-based authentication.
    // Delete what you don't need. For each of the services
    // that you utilize, you'll need to create a developer
    // account and get the necessary information and either 
    // set the appropriate environment variables or fill in
    // the values as strings below.
    AUTH_FACEBOOK: {
        clientID            : process.env.FACEBOOK_CLIENT_ID || '291045011049156' || 'Your App ID',
        clientSecret        : process.env.FACEBOOK_CLIENT_SECRET || '95b66d94c379003eddec1b80f193ac07' || 'Your App Secret',
        callbackURL         : '/auth/facebook/callback',
        passReqToCallback   : true
    },

    AUTH_GOOGLE: {
        clientID            : process.env.GOOGLE_CLIENT_ID || '276213738037-s0h6k69henethg2u34fbuiu5hrh0lv9b.apps.googleusercontent.com' || 'Your Client ID',
        clientSecret        : process.env.GOOGLE_CLIENT_SECRET || 'qKK52IdUuuN35tZPXG8ON23_' || 'Your Client Secret',
        callbackURL         : '/auth/google/callback',
        passReqToCallback   : true
    },

    AUTH_TWITTER: {
        consumerKey         : process.env.TWITTER_CONSUMER_KEY || '35Dt7C6J3fZABNQD4sg9Rg' || 'Your Consumer Key',
        consumerSecret      : process.env.TWITTER_CONSUMER_SECRET || 'RGGvF9wz9iEFFepHbAMREPVN2IdfzgikSQqImUe1ps' || 'Your Consumer Secret',
        callbackURL         : '/auth/twitter/callback',
        passReqToCallback   : true
    },
    
    AUTH_GITHUB: {
        clientID            : process.env.GITHUB_CLIENT_ID || '68c201e5cd70eb44b094' || 'Your Client ID',
        clientSecret        : process.env.GITHUB_CLIENT_SECRET || '8f5aeffb9f1512fc5237c9067fd80a4c903b321e' || 'Your Client Secret',
        callbackURL         : '/auth/github/callback',
        passReqToCallback   : true
    }
};