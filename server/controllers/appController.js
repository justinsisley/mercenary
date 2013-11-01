var _ = require('underscore'),
    config = require('../config');

exports.publicIndex = function(req, res) {
    'use strict';

    if ('development' === config.ENV) {
        res.render('app', _.extend(config, {
            // Allow the optimized JavaScript file to be
            // used in development mode. Uses AMD by default when
            // in ENV is set to 'development'.
            // This ternary statement is like an "undo" for development mode.
            development: config.ASSETS.JS.OPTIMIZED ? false : true
        }));
    } else {
        _.extend(config, {
            'google_analytics': config.GOOGLE_ANALYTICS.PRD
        });

        // Production environment
        res.render('app', config);
    }
};