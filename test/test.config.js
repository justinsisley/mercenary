require([
    '../../test/spec/client/app',
    '../../test/spec/client/main',
], function() {
    if (window.mochaPhantomJS) {
        mochaPhantomJS.run();
    } else {
        mocha.run();
    }
});