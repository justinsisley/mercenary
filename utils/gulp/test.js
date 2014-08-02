var gulp            = require('gulp');
var mochaPhantomJS  = require('gulp-mocha-phantomjs');
var connect         = require('gulp-connect');
var open = require('gulp-open');

gulp.task('test', function () {
    return gulp
        .src('test/testrunner.html')
        .pipe(mochaPhantomJS());
});

gulp.task('test-browser', function () {
    gulp.src('./test/testrunner.html')
        .pipe(open('', {
            url: 'http://localhost:8744/test/testrunner.html'
        }));

    connect.server({
        root: ['./'],
        port: 8744
    });
});