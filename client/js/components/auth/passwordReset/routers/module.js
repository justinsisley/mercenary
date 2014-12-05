var Marionette = require('marionette');
var controller = require('components/auth/passwordReset/controllers/module');

module.exports = Marionette.AppRouter.extend({
    controller: controller,

    appRoutes: {
        'password/reset': 'resetPassword'
    }
});