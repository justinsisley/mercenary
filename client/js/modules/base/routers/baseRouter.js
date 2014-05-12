/**
 * The base router defines all of the available routes.
 * This router should be the source of truth for what
 * paths exists across your application.
 */

define([
    'marionette',

    'modules/base/controllers/baseController'
], function(
    Marionette,

    BaseController
) {
    return Marionette.AppRouter.extend({
        // The base controller handles
        // all of our routes.
        controller: BaseController,

        appRoutes: {
            // Unauthenticated routes
            ''          : 'home',
            'features'  : 'features',
            'signup'    : 'signup',
            'login'     : 'login',

            // Authenticated routes
            'dashboard' : 'dashboard',
            'logout'    : 'logout',

            // 404
            '*notfound' : 'notFound'
        }
    });
});