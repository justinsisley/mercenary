var _       = require('underscore'),
    config  = require('../../config');

module.exports = function(req, res) {
    _.extend(config, {
        domain              : config.settings.domain,
        cdnDomain           : config.settings.cdnDomain,
        cssVersion          : config.versions.css,
        javascriptVersion   : config.versions.javascript
    });

    // If this is a non-development environment,
    // we provide a Google Analytics tracker ID.
    if ('development' !== config.settings.env) {
        _.extend(config, {
            googleAnalytics: process.env.GA_TRACKER || config.secrets.gaTracker
        });
    }

    // If this is a development environment or
    // we want to force development assets, we
    // we tell the app template that we're in
    // development mode.
    if ('development' === config.settings.env || true === config.settings.forceDev) {
        _.extend(config, {
            development: true
        });
    }

    // If we want to force production mode and
    // serve compiled and minified assets, we
    // tell the app template that we're not in
    // development mode.
    if (true === config.settings.forcePrd) {
        config.development = false;
    }

    res.render('app', config);
};