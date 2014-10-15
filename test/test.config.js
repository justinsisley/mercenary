require([
    '../../test/spec/client/app',
    '../../test/spec/client/main',
    '../../test/spec/client/helpers/linkHandler',
    '../../test/spec/client/helpers/routers'
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