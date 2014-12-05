var Marionette = require('marionette');
var controller = require('components/auth/activation/controllers/module');

module.exports = Marionette.AppRouter.extend({
    controller: controller,

    appRoutes: {
        'activation/resend': 'resendActivation'
    }
});