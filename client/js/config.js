/**
 * Shared configuration (between application and tests)
 */
require.config({
    baseUrl: '/js/',
    urlArgs: 'v=' + (new Date()).getTime(),
    paths: {
        requireLib              : '../vendor/requirejs/require',
        jquery                  : '../vendor/jquery/jquery.min',
        underscore              : '../vendor/lodash/dist/lodash.underscore',
        backbone                : '../vendor/backbone/backbone',
        marionette              : '../vendor/backbone.marionette/lib/backbone.marionette',
        dust                    : '../vendor/dustjs-linkedin/dist/dust-full-2.2.3',
        'dust.helpers'          : '../vendor/dustjs-linkedin-helpers/dist/dust-helpers-1.1.1',
        'marionette.dust'       : 'helpers/backbone.marionette.dust'
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        marionette: {
            deps    : ['underscore', 'jquery', 'backbone'],
            exports : 'Marionette'
        },
        dust: {
            exports: 'dust'
        },
        'dust.helpers': ['dust']
    }
});