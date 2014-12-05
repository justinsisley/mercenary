var Marionette = require('marionette');
var controller = require('components/auth/signup/controllers/module');

module.exports = Marionette.AppRouter.extend({
    controller: controller,

    appRoutes: {
        'signup': 'signup'
    }
});