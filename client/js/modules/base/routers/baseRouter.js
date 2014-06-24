/**
 * The base router defines all of the available routes.
 * This router should be the source of truth for what
 * paths exists across your application.
 */
define(function(require) {
    var Marionette = require('marionette');
    var BaseController = require('modules/base/controllers/baseController');

    return Marionette.AppRouter.extend({
        // The base controller handles
        // all of our routes.
        controller: BaseController,

        appRoutes: {
            // Unauthenticated routes
            ''          : 'home',
            'signup'    : 'signup',
            'login'     : 'login',

            // Authenticated routes
            'dashboard' : 'dashboard',
            'users'     : 'users',
            'logout'    : 'logout',

            // 404
            '*notfound' : 'notFound'
        }
    });
});