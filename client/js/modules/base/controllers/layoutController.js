/**
 * The layout controller demonstrates a way of
 * changing application "contexts", by allowing
 * you to switch between multiple layouts.
 * Mercenary has two layouts by default: the public
 * layout, shown to unauthenticated users, and the
 * app layout, which is for logged-in users only.
 */
define(function(require) {
    var App                     = require('app');

    var PublicLayout            = require('modules/base/views/publicLayout');
    var AppLayout               = require('modules/base/views/appLayout');

    var publicNavController     = require('modules/navbar/controllers/navbarController');
    var publicFooterController  = require('modules/footer/controllers/publicFooterController');
    var appHeaderController     = require('modules/header/controllers/appHeaderController');
    var sidebarController       = require('modules/sidebar/controllers/sidebarController');

    return {
        // Configures the app for the "public",
        // unauthenticated "mode". Each "mode"
        // has a distinct layout.
        // Executes a callback once the layout
        // has rendered.
        publicLayout: function(callback) {
            // If the user is already logged in,
            // send them to the dashboard.
            if (App.vars.user) {
                return Backbone.history.navigate('/dashboard', true);
            }

            // Prevent re-rendering of the
            // public layout if it is
            // currently visible.
            if (App.publicLayout) {
                return callback && callback();
            }

            // If we've made it past the above
            // check, we create a new public
            // layout, then set it as a property
            // on App to make it accessible across
            // the application's modules.
            App.publicLayout = new PublicLayout();

            // Add a unique class to the body to allow
            // for fully-independent styling between
            // the public layout and the app layout.
            $('body').removeClass('app-layout').addClass('public-layout');

            // Show the public layout in the
            // application's main content region.
            App.mainRegion.show(App.publicLayout);

            // Show the public navigation menu.
            publicNavController.show();

            // Show the public footer.
            publicFooterController.show();

            // Since we're showing the public layout,
            // we'll attempt to close the app layout,
            // if it exists.
            if (App.appLayout && App.appLayout.close) {
                App.appLayout.close();
            }

            // Once we're sure the previously open 
            // layout has been closed, we nullify 
            // the app layout property.
            App.appLayout = null;

            App.vent.trigger('layoutController:publicLayout');

            return callback && callback();
        },

        // Configures the app for the logged-in,
        // or authenticated "mode".
        // This mode has a different layout
        // than the "public mode", with a sidebar
        // and no footer.
        // Executes a callback once the layout
        // has rendered.
        appLayout: function(callback) {
            // The user must be logged in to get here.
            if (!App.vars.user) {
                return Backbone.history.navigate('/login', true);
            }

            // Prevent re-rendering of the
            // app layout if it is
            // currently visible.
            if (App.appLayout) {
                return callback && callback();
            }

            // If we've made it past the above
            // check, we create a new app layout,
            // then set it as a property on App 
            // to make it accessible across the 
            // application's modules.
            App.appLayout = new AppLayout();

            // Add a unique class to the body to allow
            // for fully-independent styling between
            // the public layout and the app layout.
            $('body').removeClass('public-layout').addClass('app-layout');

            // Show the app layout in the
            // application's main content region.
            App.mainRegion.show(App.appLayout);

            // Show the authenticated app header.
            appHeaderController.show();

            // Show the authenticated app sidebar.
            sidebarController.show();

            // Since we're showing the app layout,
            // we'll attempt to close the public layout
            // if it exists.
            if (App.publicLayout && App.publicLayout.close) {
                App.publicLayout.close();
            }

            // Once we're sure the previously open
            // layout has been closed, we nullify 
            // the app layout property.
            App.publicLayout = null;

            App.vent.trigger('layoutController:appLayout');

            return callback && callback();
        }
    };
});