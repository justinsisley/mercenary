var App                 = require('app');
var showPublicLayout    = require('shared/layouts/controllers/publicLayout');
var HomeView            = require('components/home/views/mainItem');
var HeroView            = require('components/home/views/heroItem');
var controller          = {};

controller.home = function() {
    showPublicLayout(controller.show);
};

controller.show = function() {
    var homeView = new HomeView();
    var heroView = new HeroView();

    App.publicLayout.heroRegion.show(heroView);
    App.publicLayout.signinRegion.empty();
    App.publicLayout.contentRegion.show(homeView);

    // Unfix the public footer from the bottom
    // of the page.
    App.vent.trigger('publicFooter:unfix');

    App.vent.trigger('homeController:show');
    App.vent.trigger('domchange:title');
};

module.exports = controller;