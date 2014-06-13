define([
    'marionette',

    'app'
], function(
    Marionette,
    
    App
) {
    return Marionette.ItemView.extend({
        template: 'sidebar/sidebar',

        initialize: function() {
            var self = this;

            App.vent.on('dashboardController:show', function() {
                self.selectMenuItem('Dashboard');
            });

            App.vent.on('usersController:show', function() {
                self.selectMenuItem('Users');
            });
        },

        events: {
            'click a': 'linkHandler'
        },

        linkHandler: function(e) {
            e.preventDefault();

            Backbone.history.navigate(e.target.pathname, true);
        },

        selectMenuItem: function(item) {
            this.$('.active').removeClass('active');

            this.$('a:contains("' + item + '")').parent().addClass('active');
        }
    });
});