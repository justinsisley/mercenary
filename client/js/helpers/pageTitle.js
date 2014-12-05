var App = require('app');
var settings = require('constants/settings');

// Allow page title changes from anywhere in the application.
App.vent.on('domchange:title', function(title) {
    document.title = settings.APP_NAME + (title ? (' | ' + title) : '');

    // This is also a good time to scroll to the
    // top of the window.
    $('html, body').scrollTop(0);
});