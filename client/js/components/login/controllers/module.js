var App                 = require('app');
var showPublicLayout    = require('shared/layouts/controllers/publicLayout');
var Login               = require('components/login/views/mainItem');
var Hero                = require('components/login/views/heroItem');
var controller          = {};

controller.login = function() {
    showPublicLayout(controller.show);
};

controller.logout = function() {
    var protocol    = window.location.protocol + '//';
    var host        = window.location.host;
    var homeUrl     = protocol + host;

    $.post('/users/logout')
        .done(function() {
            window.location = homeUrl;
        });
};

controller.show = function() {
    var loginView = new Login();
    var heroView = new Hero();

    App.publicLayout.heroRegion.show(heroView);
    App.publicLayout.signinRegion.show(loginView);
    App.publicLayout.contentRegion.empty();

    // Fix the public footer to the bottom
    // of the page.
    App.vent.trigger('publicFooter:fix');

    App.vent.trigger('loginController:show');
    App.vent.trigger('domchange:title', 'Log In');
};

module.exports = controller;