define([
    'app'
],function(
    App
) {
    return {
        show: function() {
            App.vent.trigger('appHeaderController:show');
        }
    };
});