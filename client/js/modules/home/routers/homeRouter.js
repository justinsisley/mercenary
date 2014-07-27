/**
 * The base router defines all of the available routes.
 * This router should be the source of truth for what
 * paths exists across your application.
 */
var Marionette = require('marionette');
var HomeController = require('modules/home/controllers/homeController');

module.exports = Marionette.AppRouter.extend({
    controller: HomeController,

    appRoutes: {
        '': 'home'
    }
});