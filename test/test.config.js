require([
    '../../test/spec/client/app',
    '../../test/spec/client/main',
    '../../test/spec/client/routers',
    '../../test/spec/client/helpers/linkHandler'
], function() {
    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }

    // Keeps the test runner URL consistent
    // for quick test refreshing.
    afterEach(function() {
        Backbone.history.navigate('/test/testrunner.html');
    });
});