var App = require('app');
var PublicFooterView = require('modules/footer/views/publicFooterView');

module.exports = {
    show: function() {
        var publicFooterView = new PublicFooterView();

        App.publicLayout.footerRegion.show(publicFooterView);

        App.vent.trigger('publicFooterController:show');
    }
};