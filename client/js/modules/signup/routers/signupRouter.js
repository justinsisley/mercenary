/**
 * The base router defines all of the available routes.
 * This router should be the source of truth for what
 * paths exists across your application.
 */
var Marionette = require('marionette');
var SignupController = require('modules/signup/controllers/signupController');

module.exports = Marionette.AppRouter.extend({
    controller: SignupController,

    appRoutes: {
        'signup': 'signup'
    }
});