var gulp            = require('gulp');
var mochaPhantomJS  = require('gulp-mocha-phantomjs');
var connect         = require('gulp-connect');
var open            = require('gulp-open');
var config          = require('./config');

gulp.task('test', function() {
    return gulp.src(config.testRunnerFile)
        .pipe(mochaPhantomJS());
});

gulp.task('test-browser', function() {
    var testRunnerURL = 'http://' +
        config.testRunnerHost + ':' +
        config.testRunnerPort + '/' +
        config.testRunnerFile;

    gulp.src('./' + config.testRunnerFile)
        .pipe(open('', {url: testRunnerURL}));

    connect.server({
        root: ['./'],
        port: config.testRunnerPort
    });
});