define([
    'app',
    'marionette',

    'modules/header/templates/appHeader'
], function(
    App,
    Marionette
) {
    return Marionette.ItemView.extend({
        template: 'header/appHeader',

        events: {
            'click a': 'linkHandler'
        },

        linkHandler: function(e) {
            e.preventDefault();

            Backbone.history.navigate(e.target.pathname);
        }
    });
});