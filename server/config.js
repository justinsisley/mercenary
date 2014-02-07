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

    // If we're in a development environment, construct
    // the application's web address at run time based
    // on the system's host name and the port setting.
    // If we're not in development, use the home page
    // property in the package.json file.
    WWW_ADDRESS: (function() {
        'use strict';

        if (!process.env.ENV || process.env.ENV === 'development') {
            return 'http://' + hostname + ':' + module.exports.PORT;
        }

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

    // Defines the version numbers for static assets such as
    // JavaScripts, CSS stylesheets, and web fonts.
    // The revision properties shouldn't be edited, as they'll
    // just do their thing and keep your app running the latest
    // versions of your static assets.
    // The "OPTIMIZED" property in the "JS" object controls can
    // be toggled if you would like to test the concatenated and
    // minified JavaScript file in your development environment.
    ASSETS: {
        JS: {
            // If true, will serve the single optimized file built by r.js.
            // If false, will use un-optimized, individual modules.
            OPTIMIZED: process.env.APPLICATION_JS_OPT || false,

            // Don't edit this directly.
            REVISION: packageJSON.revisionJS
        },
        CSS: {
            // Don't edit this directly.
            REVISION: packageJSON.revisionCSS
        },
        CSS_FONT: {
            // Don't edit this directly.
            REVISION: packageJSON.revisionCSSfont
        }
    }
};