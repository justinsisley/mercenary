var controller = {};

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
controller.notFound = function() {
    return Backbone.history.navigate('/dashboard', true);
};

module.exports = controller;