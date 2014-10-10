var App                 = require('app');
var PublicFooterView    = require('components/footer/views/mainItem');
var controller          = {};

controller.show = function() {
    var publicFooterView = new PublicFooterView();

    App.publicLayout.footerRegion.show(publicFooterView);

    App.vent.trigger('publicFooterController:show');
};

module.exports = controller;