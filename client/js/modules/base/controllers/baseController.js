/**
 * The base controller works hand-in-hand with the
 * base router to handle routes appropriately. It's
 * basically a switchboard that provides a callback
 * for each route in the base router.
 * The base controller's methods should leverage
 * other module controllers to get the real work
 * done, which, most of the time, means rendering
 * one or more views.
 *
 * This controller also demonstrates a way of
 * changing application "contexts", by allowing
 * you to switch between two different layouts.
 * Mercenary has two layouts by default: the public
 * layout, shown to unauthenticated users, and the
 * app layout, which is for logged in users only.
 */
define([
    'app',

    'modules/base/views/publicLayout',
    'modules/base/views/appLayout',

    'modules/header/controllers/publicHeaderController',
    'modules/footer/controllers/publicFooterController',

    'modules/header/controllers/appHeaderController',
    
    'modules/home/controllers/homeController',
    'modules/features/controllers/featuresController',
    'modules/signup/controllers/signupController',
    'modules/login/controllers/loginController'

    // 'modules/dashboard/controllers/dashboardController'
],function(
    App,

    PublicLayout,
    AppLayout,
    
    publicHeaderController,
    publicFooterController,

    appHeaderController,
    
    homeController,
    featuresController,
    signupController,
    loginController

    // dashboardController
) {
    'use strict';

    return {
        home: function() {
            this.showPublicLayout();

            homeController.show();

            App.vent.trigger('baseController:home');
        },

        features: function() {
            this.showPublicLayout();

            featuresController.show();

            App.vent.trigger('baseController:features');
        },

        signup: function() {
            this.showPublicLayout();

            signupController.show();

            App.vent.trigger('baseController:signup');
        },

        login: function() {
            this.showPublicLayout();

            loginController.show();

            App.vent.trigger('baseController:login');
        },

        dashboard: function() {
            this.showAppLayout();

            // dashboardController.show();

            App.vent.trigger('baseController:dashboard');
        },

        showPublicLayout: function() {
            // Prevent re-rendering of the
            // public layout if it is
            // currently visible.
            if (App.publicLayout) {
                return false;
            }

            // If we've gotten past the above
            // check, we create a new public
            // layout, then set it as a property
            // on App to make it accessible across
            // the application's modules.
            App.publicLayout = new PublicLayout();

            // Show the public layout in the
            // application's main content region.
            App.mainContentRegion.show(App.publicLayout);

            // Show the public header
            publicHeaderController.show();

            // Show the public footer
            publicFooterController.show();

            // Since we're showing the public layout,
            // we'll attempt to close the app layout
            // if it exists.
            if (App.appLayout && App.appLayout.close) {
                App.appLayout.close();
            }

            // Once we're sure the previously open 
            // layout has been closed, we nullify 
            // the app layout property.
            App.appLayout = null;

            App.vent.trigger('baseController:showPublicLayout');
        },

        showAppLayout: function() {
            // Prevent re-rendering of the
            // app layout if it is
            // currently visible.
            if (App.appLayout) {
                return false;
            }

            // If we've gotten past the above
            // check, we create a new app layout,
            // then set it as a property on App 
            // to make it accessible across the 
            // application's modules.
            App.appLayout = new AppLayout();

            // Show the app layout in the
            // application's main content region.
            App.mainContentRegion.show(App.appLayout);

            // Show the authenticated app header
            appHeaderController.show();

            // Show the authenticated app sidebar
            // sidebarController.show();

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

            App.vent.trigger('baseController:showAppLayout');
        }
    };
});