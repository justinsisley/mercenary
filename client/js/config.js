/**
 * Shared configuration (between application and tests).
 */
require.config({
    baseUrl: '/js/',
    urlArgs: 'v=' + (new Date()).getTime(),
    paths: {
        // Framework dependencies
        requireLib              : '../vendor/requirejs/require',
        jquery                  : '../vendor/jquery/dist/jquery',
        underscore              : '../vendor/lodash/dist/lodash.underscore',
        backbone                : '../vendor/backbone/backbone',
        marionette              : '../vendor/backbone.marionette/lib/backbone.marionette',
        'backbone.babysitter'   : '../vendor/backbone.babysitter/lib/backbone.babysitter',
        'backbone.wreqr'        : '../vendor/backbone.wreqr/lib/backbone.wreqr',
        dust                    : '../vendor/dustjs-linkedin/dist/dust-full',
        'dust.helpers'          : '../vendor/dustjs-linkedin-helpers/dist/dust-helpers-1.1.2',
        dustMarionette          : '../vendor/marionette-dust/src/amd/backbone.marionette.dust',
        templates               : '../dust/compiled',

        // Feature dependencies
        validator               : '../vendor/validator-js/validator',
        highcharts              : '../vendor/highcharts-release/highcharts',
        dropdown                : '../vendor/bootstrap/js/dropdown',
        tooltip                 : '../vendor/bootstrap/js/tooltip'
    },
    shim: {
        dust: {exports: 'dust'},
        'dust.helpers': ['dust'],
        highcharts: {exports: 'Highcharts'}
    }
});