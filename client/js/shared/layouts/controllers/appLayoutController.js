/**
 * The layout controller demonstrates a way of
 * changing application "contexts", by allowing
 * you to switch between multiple layouts.
 * Mercenary has two layouts by default: the public
 * layout, shown to unauthenticated users, and the
 * app layout, which is for logged-in users only.
 */
var App                     = require('app');
var AppLayout               = require('shared/layouts/views/appLayoutView');
var appHeaderController     = require('modules/header/controllers/main');
var sidebarController       = require('modules/sidebar/controllers/main');

// Configures the app for the logged-in,
// or authenticated "mode".
// This mode has a different layout
// than the "public mode", with a sidebar
// and no footer.
// Executes a callback once the layout
// has rendered.
module.exports = function(callback) {
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
};