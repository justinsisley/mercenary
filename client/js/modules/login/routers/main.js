/**
 * The base router defines all of the available routes.
 * This router should be the source of truth for what
 * paths exists across your application.
 */
var Marionette = require('marionette');
var Controller = require('modules/login/controllers/main');

module.exports = Marionette.AppRouter.extend({
    controller: Controller,

    appRoutes: {
        'login': 'login',
        'logout': 'logout'
    }
});