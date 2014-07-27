/**
 * The base router defines all of the available routes.
 * This router should be the source of truth for what
 * paths exists across your application.
 */
var Marionette = require('marionette');
var LoginController = require('modules/login/controllers/loginController');

module.exports = Marionette.AppRouter.extend({
    controller: LoginController,

    appRoutes: {
        'login': 'login'
    }
});