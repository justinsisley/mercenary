/**
 * The base router defines all of the available routes.
 * This router should be the source of truth for what
 * paths exists across your application.
 */
var Marionette = require('marionette');
var UsersController = require('modules/users/controllers/usersController');

module.exports = Marionette.AppRouter.extend({
    controller: UsersController,

    appRoutes: {
        'users': 'users'
    }
});