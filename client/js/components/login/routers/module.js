var Marionette = require('marionette');
var controller = require('components/login/controllers/module');

module.exports = Marionette.AppRouter.extend({
    controller: controller,

    appRoutes: {
        'login': 'login',
        'logout': 'logout'
    }
});