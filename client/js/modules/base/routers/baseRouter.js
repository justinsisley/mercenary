/**
 * The base router defines all of the available routes.
 * This router should be the source of truth for what
 * paths exists across your application.
 */
define([
    'backbone',
    'modules/base/controllers/baseController'
], function(Backbone, BaseController) {
    'use strict';

    return Backbone.Marionette.AppRouter.extend({
        controller: BaseController,

        appRoutes: {
            // Unauthenticated routes
            ''          : 'home',
            'features'  : 'features',
            'signup'    : 'signup',
            'login'     : 'login',

            // Authenticated routes
            'dashboard' : 'dashboard'
        }
    });
});