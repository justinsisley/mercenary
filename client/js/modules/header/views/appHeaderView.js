define([
    'marionette',

    'app',
    'modules/header/templates/appHeader'
], function(
    Marionette,

    App
) {
    return Marionette.ItemView.extend({
        template: 'header/appHeader',

        events: {
            'click a'               : 'linkHandler',
            'click #js-logout-link' : 'logoutHandler'
        },

        linkHandler: function(e) {
            e.preventDefault();

            Backbone.history.navigate(e.target.pathname);
        },

        logoutHandler: function(e) {
            e.preventDefault();

            App.logout();
        }
    });
});