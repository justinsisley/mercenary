var App                 = require('app');
var showPublicLayout    = require('shared/layouts/controllers/publicLayout');
var SignupView          = require('modules/signup/views/mainItem');
var HeroView            = require('modules/signup/views/heroItem');

var controller = {
    signup: function() {
        showPublicLayout(controller.show);
    },

    show: function() {
        var signupView = new SignupView();
        var heroView = new HeroView();

        App.publicLayout.heroRegion.show(heroView);
        App.publicLayout.signinRegion.show(signupView);
        App.publicLayout.contentRegion.empty();

        // Fix the public footer to the bottom
        // of the page.
        App.vent.trigger('publicFooter:fix');

        App.vent.trigger('signupController:show');
        App.vent.trigger('domchange:title', 'Sign Up');
    }
};

module.exports = controller;