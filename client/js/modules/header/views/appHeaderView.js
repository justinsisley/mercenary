define(['marionette'], function(Marionette) {
    return Marionette.ItemView.extend({
        template: 'header/appHeader',

        events: {
            'click a'               : 'linkHandler',
            'click #js-logout-link' : 'logoutHandler'
        },

        linkHandler: function(e) {
            e.preventDefault();

            Backbone.history.navigate(e.target.pathname, true);
        },

        logoutHandler: function(e) {
            e.preventDefault();

            Backbone.history.navigate('/logout', true);
        }
    });
});