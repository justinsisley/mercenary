var _       = require('underscore');
var config  = require('../../config');

module.exports = function(req, res) {
    _.extend(config, {
        domain              : config.settings.domain,
        cdnDomain           : config.settings.cdnDomain,
        cssVersion          : config.versions.css,
        javascriptVersion   : config.versions.javascript
    });

    var devEnvironment = ('development' === process.env.NODE_ENV ||
                        'development' === config.settings.env);

    // If this is a non-development environment,
    // we provide a Google Analytics tracker ID.
    if (!devEnvironment) {
        _.extend(config, {
            googleAnalytics: process.env.GA_TRACKER || config.secrets.gaTracker
        });
    }

    // If this is a development environment or
    // we want to force development assets, we
    // we tell the app template that we're in
    // development mode.
    if (devEnvironment || config.settings.forceDev) {
        _.extend(config, {development: true});
    }

    // If we want to force production mode and
    // serve compiled and minified assets, we
    // tell the app template that we're not in
    // development mode.
    if (config.settings.forcePrd) {
        config.development = false;
    }

    return res.render('app', config);
};