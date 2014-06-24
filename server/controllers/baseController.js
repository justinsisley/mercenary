var config  = require('../../config');

module.exports = function(req, res) {
    // Add special properties to the config
    // object that we'll pass to our master
    // template.
    config.domain = config.settings.domain;
    config.cdnDomain = config.settings.cdnDomain;
    config.cssVersion = config.versions.css;
    config.javascriptVersion = config.versions.javascript;

    var devEnvironment = ('development' === process.env.NODE_ENV ||
                        'development' === config.settings.env);

    // If this is a development environment, we
    // we tell the app template that we're in
    // development mode. If this is a
    // non-development environment, we provide
    // a Google Analytics tracker ID.
    if (devEnvironment) {
        config.development = true;
    } else {
        config.googleAnalytics = process.env.GA_TRACKER || config.secrets.gaTracker;
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