var gulp            = require('gulp');
var concatSourcemap = require('gulp-concat-sourcemap');
var concat          = require('gulp-concat');
var jshint          = require('gulp-jshint');
var config          = require('./config');

gulp.task('jshint', function() {
    return gulp.src(['client/js/**/*.js', 'server/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});