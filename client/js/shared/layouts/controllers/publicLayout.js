/**
 * The layout controller demonstrates a way of
 * changing application "contexts", by allowing
 * you to switch between multiple layouts.
 * Mercenary has two layouts by default: the public
 * layout, shown to unauthenticated users, and the
 * app layout, which is for logged-in users only.
 */
var App                     = require('app');
var PublicLayout            = require('shared/layouts/views/publicLayout');
var publicNavController     = require('modules/navbar/controllers/module');
var publicFooterController  = require('modules/footer/controllers/module');

// Configures the app for the "public",
// unauthenticated "mode". Each "mode"
// has a distinct layout.
// Executes a callback once the layout
// has rendered.
module.exports = function(callback) {
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
};