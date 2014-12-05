var Marionette = require('marionette');
var controller = require('components/auth/login/controllers/module');

module.exports = Marionette.AppRouter.extend({
    controller: controller,

    appRoutes: {
        'login': 'login',
        'logout': 'logout'
    }
});