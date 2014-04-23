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
 * app layout, which is for logged-in users only.
 */

define([
    'app',

    'modules/base/views/publicLayout',
    'modules/base/views/appLayout',

    'modules/header/controllers/publicHeaderController',
    'modules/footer/controllers/publicFooterController',
    
    'modules/home/controllers/homeController',
    'modules/features/controllers/featuresController',
    'modules/signup/controllers/signupController',
    'modules/login/controllers/loginController',

    'modules/header/controllers/appHeaderController',
    'modules/sidebar/controllers/sidebarController',
    'modules/dashboard/controllers/dashboardController'
],function(
    App,

    PublicLayout,
    AppLayout,
    
    publicHeaderController,
    publicFooterController,
    
    homeController,
    featuresController,
    signupController,
    loginController,
    
    appHeaderController,
    sidebarController,
    dashboardController
) {
    return {
        // Show the public home page.
        home: function() {
            this.showPublicLayout(function() {
                homeController.show();

                App.vent.trigger('domchange:title');
                App.vent.trigger('baseController:home');
            });
        },

        // Show the public features page.
        features: function() {
            this.showPublicLayout(function() {
                featuresController.show();

                App.vent.trigger('domchange:title', 'Features');
                App.vent.trigger('baseController:features');
            });
        },

        // Show the signup page.
        signup: function() {
            this.showPublicLayout(function() {
                signupController.show();

                App.vent.trigger('domchange:title', 'Sign Up');
                App.vent.trigger('baseController:signup');
            });
        },

        // Show the login page.
        login: function() {
            this.showPublicLayout(function() {
                loginController.show();

                App.vent.trigger('domchange:title', 'Log In');
                App.vent.trigger('baseController:login');
            });
        },

        // Show the logged-in dashboard.
        dashboard: function() {
            this.showAppLayout(function() {
                dashboardController.show();

                App.vent.trigger('domchange:title', 'Dashboard');
                App.vent.trigger('baseController:dashboard');
            });
        },

        // Configures the app for the "public",
        // unauthenticated "mode". Each "mode"
        // has a distinct layout.
        // Executes a callback once the layout
        // has rendered.
        showPublicLayout: function(callback) {
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
            App.mainContentRegion.show(App.publicLayout);

            // Show the public header.
            publicHeaderController.show();

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

            App.vent.trigger('baseController:showPublicLayout');

            return callback && callback();
        },

        // Configures the app for the logged-in,
        // or authenticated "mode".
        // This mode has a different layout
        // than the "public mode", with a sidebar
        // and no footer.
        // Executes a callback once the layout
        // has rendered.
        showAppLayout: function(callback) {
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
            App.mainContentRegion.show(App.appLayout);

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

            App.vent.trigger('baseController:showAppLayout');

            return callback && callback();
        },

        // The requested page wasn't found.
        // This usually happens when a user
        // tries to navigate directly to a page
        // that doesn't have a route.
        // In this case, we're sending them
        // to the dashboard. If they're logged
        // in, the dashboard view will render,
        // otherwise, they'll be redirected
        // to the login page.
        // This could also render a 404 page.
        notFound: function() {
            return Backbone.history.navigate('/dashboard', true);
        }
    };
});