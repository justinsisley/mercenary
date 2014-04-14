var _       = require('underscore'),
    config  = require('../config');

module.exports = function(req, res) {
    _.extend(config, {
        domain              : config.DOMAIN,
        cdnDomain           : config.CDN_DOMAIN,
        cssVersion          : config.CSS_VERSION,
        javascriptVersion   : config.JAVASCRIPT_VERSION
    });

    // If this is a non-development environment,
    // we provide a Google Analytics tracker ID.
    if ('development' !== config.ENV) {
        _.extend(config, {
            googleAnalytics: config.GOOGLE_ANALYTICS
        });
    }

    // If this is a development environment or
    // we want to force development assets, we
    // we tell the app template that we're in
    // development mode.
    if ('development' === config.ENV || true === config.FORCE_DEV_ASSETS) {
        _.extend(config, {
            development: true
        });
    }

    // If we want to force production mode and
    // serve compiled and minified assets, we
    // tell the app template that we're not in
    // development mode.
    if (true === config.FORCE_PRD_ASSETS) {
        config.development = false;
    }

    res.render('app', config);
};