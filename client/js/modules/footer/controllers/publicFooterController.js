define([
    'app',
    'modules/footer/views/publicFooterView'
],function(
    App,
    PublicFooterView
) {
    return {
        show: function() {
            var publicFooterView = new PublicFooterView();
            
            App.publicLayout.footerRegion.show(publicFooterView);

            App.vent.trigger('publicFooterController:show');
        }
    };
});