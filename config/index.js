/**
 * Application configuration.
 * This file pulls in other resources,
 * so you don't need to edit it directly.
 * Change application settings using settings.json,
 * and add API keys and other sensitive information
 * to secrets.json, which is ignored by Git.
 * 
 * @type {Object}
 */
var config = {
    // Loads your settings.json file, which should
    // always exist.
    settings: require('./settings.json'),

    // Don't edit these directly. They're managed
    // by a custom Grunt task.
    versions: {javascript: 1267, css: 208}
};

// Attempts to load your secrets.json file and falls
// back to empty objects to prevent errors.
try {
    config.secrets = require('./secrets.json');
} catch(e) {
    config.secrets = {smtp: {}, auth: {facebook: {}, google: {}, twitter: {}, github: {}}}
}

module.exports = config;