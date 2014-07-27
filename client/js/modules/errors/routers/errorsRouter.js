/**
 * The base router defines all of the available routes.
 * This router should be the source of truth for what
 * paths exists across your application.
 */
var Marionette = require('marionette');
var ErrorsController = require('modules/errors/controllers/errorsController');

module.exports = Marionette.AppRouter.extend({
    controller: ErrorsController,

    appRoutes: {
        '404': 'notFound'
    }
});