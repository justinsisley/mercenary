var gulp        = require('gulp');
var concat      = require('gulp-concat');
var recess      = require('gulp-recess');
var less        = require('gulp-less');
var sourcemaps  = require('gulp-sourcemaps');
var prefix      = require('gulp-autoprefixer');
var minifyCSS   = require('gulp-minify-css');
var handleError = require('./errorHandler');
var config      = require('./config');
var livereload  = require('gulp-livereload');
var appConfig   = require('../../config');

var git = require('gulp-git');
function revParse(cb) {
    var args = '--short=14 --quiet HEAD';

    git.revParse({args: args}, cb);
}

// Lint, concatenate and compile
// LESS stylesheets, start livereload
// server.
gulp.task('less-dev', function(cb) {
    gulp.src(config.lessSrc)
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

    cb()
});

// Lint, concatenate, compile and
// minify LESS stylesheets.
gulp.task('less-prd', function(cb) {
    revParse(function(err, hash) {
        gulp.src(config.lessSrc)
            .pipe(concat('app.' + hash + '.css'))
            .pipe(recess({
                noOverqualifying: false
            }))
            .pipe(less())
            .pipe(prefix())
            .pipe(minifyCSS())
            .pipe(gulp.dest('tmp'));

        cb();
    });
});

gulp.task('css-lib-dev', function(cb) {
    gulp.src(config.cssLib)
        .pipe(prefix())
        .pipe(concat('lib.css'))
        .pipe(gulp.dest('client/css'));

    cb();
});

gulp.task('css-lib-prd', function(cb) {
    revParse(function(err, hash) {
        gulp.src(config.cssLib)
            .pipe(prefix())
            .pipe(concat('lib.' + hash + '.css'))
            .pipe(minifyCSS())
            .pipe(gulp.dest('tmp'));

        cb();
    });
});

gulp.task('less-recess', function(cb) {
    gulp.src(config.lessSrc)
        .pipe(concat('app.css'))
        .pipe(recess({
            noOverqualifying: false
        }).on('error', handleError))
        .pipe(less().on('error', handleError));

    cb();
});