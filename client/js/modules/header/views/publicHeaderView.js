define([
    'marionette',

    'app'
], function(
    Marionette,
    
    App
) {
    return Marionette.ItemView.extend({
        template: 'header/publicHeader',

        className: 'inner',

        initialize: function() {
            var self = this;

            App.vent.on('baseController:home', function() {
                self.setActiveNavItem(self.ui.navHome);
            });

            App.vent.on('baseController:features', function() {
                self.setActiveNavItem(self.ui.navFeatures);
            });

            App.vent.on('baseController:signup', function() {
                self.setActiveNavItem(self.ui.navSignup);
            });

            App.vent.on('baseController:login', function() {
                self.setActiveNavItem(self.ui.navLogin);
            });
        },

        ui: {
            navHome     : '.nav-home',
            navFeatures : '.nav-features',
            navLogin    : '.nav-login',
            navSignup   : '.nav-signup'
        },

        events: {
            'click a' : 'linkHandler'
        },

        linkHandler: function(e) {
            e.preventDefault();

            Backbone.history.navigate(e.target.pathname, true);
        },

        setActiveNavItem: function(navItem) {
            // There are plenty of clever ways 
            // to do this, but this is easy to
            // understand and takes advantage of
            // the cached selectors.
            this.ui.navHome.removeClass('active');
            this.ui.navFeatures.removeClass('active');
            this.ui.navLogin.removeClass('active');
            this.ui.navSignup.removeClass('active');

            navItem.addClass('active');
        }
    });
});