var App                 = require('app');
var showPublicLayout    = require('shared/layouts/controllers/publicLayout');
var PasswordReset       = require('components/auth/passwordReset/views/mainItem');
var Hero                = require('components/auth/passwordReset/views/heroItem');
var controller          = {};

controller.resetPassword = function() {
    showPublicLayout(controller.showResetPassword);
};

controller.showResetPassword = function() {
    var heroView = new Hero();
    var resetView = new PasswordReset();

    App.publicLayout.heroRegion.show(heroView);
    App.publicLayout.signinRegion.show(resetView);
    App.publicLayout.contentRegion.empty();

    // Fix the public footer to the bottom
    // of the page.
    App.vent.trigger('publicFooter:fix');

    App.vent.trigger('passwordResetController:showResetPassword');
    App.vent.trigger('domchange:title', 'Reset Password');
};

module.exports = controller;