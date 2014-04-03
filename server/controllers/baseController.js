var _           = require('underscore'),
    config      = require('../config'),
    packageJSON = require('../../package.json');

module.exports = function(req, res) {
    if ('development' === config.ENV) {
        res.render('app', _.extend(config, {
            // This lets you use the production JavaScript
            // while in development mode. If you're trying
            // to test this, change the "FORCE_PRD_JAVASCRIPT"
            // setting in server/config.js.
            development: config.FORCE_PRD_JAVASCRIPT ? false : true
        }));
    } else {
        _.extend(config, {
            cdnDomain           : config.CDN_DOMAIN,
            googleAnalytics     : config.GOOGLE_ANALYTICS,
            domain              : config.DOMAIN,

            // Static asset versions
            javascriptVersion   : packageJSON.javascriptVersion,
            cssVersion          : packageJSON.cssVersion,
            fontVersion         : packageJSON.fontVersion
        });

        res.render('app', config);
    }
};