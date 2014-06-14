define(function(require) {
    var App = require('app');
    var PublicHeaderView = require('modules/header/views/publicHeaderView');

    return {
        show: function() {
            var publicHeaderView = new PublicHeaderView();
            
            App.publicLayout.headerRegion.show(publicHeaderView);

            App.vent.trigger('publicHeaderController:show');
        }
    };
});