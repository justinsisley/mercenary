var App                 = require('app');
var showPublicLayout    = require('shared/layouts/controllers/publicLayout');
var Resend              = require('components/activation/views/resendItem');
var Hero                = require('components/activation/views/heroItem');
var controller          = {};

controller.resendActivation = function() {
    showPublicLayout(controller.showResendActivation);
};

controller.showResendActivation = function() {
    var heroView = new Hero();
    var resendView = new Resend();

    App.publicLayout.heroRegion.show(heroView);
    App.publicLayout.signinRegion.show(resendView);
    App.publicLayout.contentRegion.empty();

    // Fix the public footer to the bottom
    // of the page.
    App.vent.trigger('publicFooter:fix');

    App.vent.trigger('activationController:showResendActivation');
    App.vent.trigger('domchange:title', 'Send Account Activation Email');
};

module.exports = controller;