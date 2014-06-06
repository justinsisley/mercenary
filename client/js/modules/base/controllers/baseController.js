/**
 * The base controller works hand-in-hand with the
 * base router to handle routes appropriately. It's
 * basically a switchboard that provides a callback
 * for each route in the base router.
 * The base controller's methods should leverage
 * other controllers to get the real work done,
 * which, most of the time, means rendering
 * one or more regions or views.
 */
define([
    'app',
    'modules/base/controllers/layoutController',
    'modules/home/controllers/homeController',
    'modules/features/controllers/featuresController',
    'modules/signup/controllers/signupController',
    'modules/login/controllers/loginController',
    'modules/dashboard/controllers/dashboardController'
],function(
    App,
    layoutController,
    homeController,
    featuresController,
    signupController,
    loginController,
    dashboardController
) {
    return {
        // Show the public home page.
        home: function() {
            layoutController.publicLayout(homeController.show);
        },

        // Show the public features page.
        features: function() {
            layoutController.publicLayout(featuresController.show);
        },

        // Show the signup page.
        signup: function() {
            layoutController.publicLayout(signupController.show);
        },

        // Show the login page.
        login: function() {
            layoutController.publicLayout(loginController.show);
        },

        // Show the logged-in dashboard.
        dashboard: function() {
            layoutController.appLayout(dashboardController.show);
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
        },

        // Log the user out.
        logout: function() {
            $.post('/users/signout', function() {
                App.vars.user = null;

                return Backbone.history.navigate('/', true);
            });
        }
    };
});