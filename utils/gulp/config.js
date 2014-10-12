module.exports = {
    jsSrc: [
        'client/js/**/*.js',
        'server/**/*.js'
    ],

    lessSrc: [
        'client/less/utils/*.less',
        'client/less/variables/*.less',
        'client/less/elements/*.less',
        'client/less/components/**/*.less',
        'client/less/layouts/**/*.less',
        'client/less/widgets/*.less'
    ],

    cssLib: [
        'client/vendor/bootstrap/dist/css/bootstrap.css',
        'client/vendor/font-awesome/css/font-awesome.css'
    ],

    templates: ['client/dust/**/*.dust'],

    images: ['client/img/**/*'],

    compiledTemplatesName: 'compiled.js',
    compiledTemplatesDir: 'client/dust',

    testRunnerHost: 'localhost',
    testRunnerPort: 8744,
    testRunnerFile: 'test/testrunner.html'
};