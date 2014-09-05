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
var livereload  = require('gulp-livereload');
var appConfig   = require('../../config');

// Lint, concatenate and compile
// LESS stylesheets, start livereload
// server.
gulp.task('less-dev', function() {
    return gulp.src(config.lessSrc)
        .pipe(sourcemaps.init())
            .pipe(concat('app.css'))
            .pipe(recess({
                noOverqualifying: false
            }).on('error', handleError))
            .pipe(less().on('error', handleError))
            .pipe(prefix())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('client/css'))
        .pipe(livereload());
});

// Lint, concatenate, compile and
// minify LESS stylesheets.
gulp.task('less-prd', function() {
    return gulp.src(config.lessSrc)
        .pipe(concat('app.' + appConfig.revision + '.css'))
        .pipe(recess({
            noOverqualifying: false
        }))
        .pipe(less())
        .pipe(prefix())
        .pipe(minifyCSS())
        .pipe(gulp.dest('tmp'));
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
        .pipe(concat('lib.' + appConfig.revision + '.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('tmp'));
});

gulp.task('less-recess', function() {
    return gulp.src(config.lessSrc)
        .pipe(concat('app.css'))
        .pipe(recess({
            noOverqualifying: false
        }).on('error', handleError))
        .pipe(less().on('error', handleError));
});