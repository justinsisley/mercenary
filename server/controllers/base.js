var config = require('../../config');
var env = require('../constants/env');

module.exports = function(req, res) {
    // If this is a development environment, we
    // we tell the app template that we're in
    // development mode. If this is a
    // non-development environment, we provide
    // a Google Analytics tracker ID.
    if (env.IS_DEV) {
        config.development = true;
    } else {
        config.googleAnalytics = process.env.GA_TRACKER || config.secrets.gaTracker;
    }

    return res.render('app', config);
};