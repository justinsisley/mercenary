/**
 * Application configuration.
 * This file pulls in other resources,
 * so you don't need to edit it directly.
 * Change application settings using settings.json,
 * and add API keys and other sensitive information
 * to secrets.json, which is ignored by Git.
 */
var config = {
    settings: require('./settings.json'),

    revision: '6b40e1306e3654'
};

// Attempts to load your secrets.json file and falls
// back to a dummy object to prevent errors.
try {
    config.secrets = require('./secrets.json');
} catch(e) {
    // Dummy object
    config.secrets = {
        smtp: {},
        auth: {
            facebook: {},
            google: {},
            twitter: {},
            github: {}
        }
    }
}

module.exports = config;