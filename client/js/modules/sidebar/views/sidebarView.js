define(['marionette'], function(Marionette) {
    return Marionette.ItemView.extend({
        template: 'sidebar/sidebar',

        events: {
            'click a': 'linkHandler'
        },

        linkHandler: function(e) {
            e.preventDefault();

            Backbone.history.navigate(e.target.pathname, true);
        }
    });
});