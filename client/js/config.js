/**
 * Shared configuration (between application and tests)
 */
require.config({
    baseUrl: '/js/',
    urlArgs: 'v=' + (new Date()).getTime(),
    paths: {
        requireLib              : '../vendor/requirejs/require',
        jquery                  : '../vendor/jquery/dist/jquery.min',
        underscore              : '../vendor/lodash/dist/lodash.underscore',
        backbone                : '../vendor/backbone/backbone',
        marionette              : '../vendor/backbone.marionette/lib/core/amd/backbone.marionette',
        'backbone.babysitter'   : '../vendor/backbone.babysitter/lib/backbone.babysitter',
        'backbone.wreqr'        : '../vendor/backbone.wreqr/lib/backbone.wreqr',
        dust                    : '../vendor/dustjs-linkedin/dist/dust-full',
        'dust.helpers'          : '../vendor/dustjs-linkedin-helpers/dist/dust-helpers-1.1.2',
        dustMarionette          : '../vendor/marionette-dust/src/amd/backbone.marionette.dust',
        holder                  : '../vendor/holderjs/holder',
        validator               : '../vendor/validator-js/validator'
    },
    shim: {
        dust: {exports: 'dust'},
        'dust.helpers': ['dust']
    }
});