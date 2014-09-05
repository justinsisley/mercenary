var config = require('../../config');

module.exports = function(req, res) {
    var prdEnvironment = (
        'production' === process.env.NODE_ENV ||
        'production' === config.settings.env
    );

    var devEnvironment = (
        'development' === process.env.NODE_ENV ||
        'development' === config.settings.env &&
        !prdEnvironment
    );

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

    return res.render('app', config);
};