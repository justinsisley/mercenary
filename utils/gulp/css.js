var gulp        = require('gulp');
var concat      = require('gulp-concat');
var recess      = require('gulp-recess');
var less        = require('gulp-less');
var sourcemaps  = require('gulp-sourcemaps');
var prefix      = require('gulp-autoprefixer');
var minifyCSS   = require('gulp-minify-css');
var gutil       = require('gulp-util');
var handleError = require('./errorHandler');
var config      = require('./config');

// Lint, concatenate and compile
// LESS stylesheets.
gulp.task('less-src-dev', function() {
    return gulp.src(config.lessSrc)
        .pipe(sourcemaps.init())
            .pipe(concat('app.css'))
            .pipe(recess().on('error', handleError))
            .pipe(less().on('error', handleError))
            .pipe(prefix())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('client/css'));
});

// Lint, concatenate, compile and
// minify LESS stylesheets.
gulp.task('less-src-prd', function() {
    return gulp.src(config.lessSrc)
        .pipe(concat('app.css'))
        .pipe(recess())
        .pipe(less())
        .pipe(prefix())
        .pipe(minifyCSS())
        .pipe(gulp.dest('client/css'));
});

gulp.task('css-lib-dev', function() {
    return gulp.src(config.cssLib)
        .pipe(prefix())
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('client/css'));
});

gulp.task('css-lib-prd', function() {
    return gulp.src(config.cssLib)
        .pipe(prefix())
        .pipe(concat('lib.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'));
});