var gulp        = require('gulp');
var _           = require('underscore');
var awspublish  = require('gulp-awspublish');
var rename      = require('gulp-rename');
var config      = require('../../config');

gulp.task('s3-css', function() {
    var publisher = awspublish.create(config.secrets.amazonS3);

    var headers = {
        'Cache-Control': 'max-age=87091200000, no-transform, public'
    };

    return gulp.src('./tmp/*.css')
        .pipe(rename(function(path) {
            path.dirname += '/css';
        }))
        .pipe(publisher.publish(headers))
        .pipe(awspublish.reporter());
});

gulp.task('s3-js', function() {
    var publisher = awspublish.create(config.secrets.amazonS3);

    var headers = {
        'Cache-Control': 'max-age=87091200000, no-transform, public'
    };

    return gulp.src('./tmp/*.js')
        .pipe(rename(function(path) {
            path.dirname += '/js';
        }))
        .pipe(publisher.publish(headers))
        .pipe(awspublish.reporter());
});

gulp.task('s3-fonts', function() {
    var publisher = awspublish.create(config.secrets.amazonS3);

    var headers = {
        'Cache-Control': 'max-age=87091200000, no-transform, public'
    };

    return gulp.src('./client/fonts/*')
        .pipe(rename(function(path) {
            path.dirname += '/fonts';
        }))
        .pipe(publisher.publish(headers))
        .pipe(awspublish.reporter());
});

gulp.task('s3-img', function() {
    var publisher = awspublish.create(config.secrets.amazonS3);

    var headers = {
        'Cache-Control': 'max-age=87091200000, no-transform, public'
    };

    return gulp.src('./client/img/*')
        .pipe(rename(function(path) {
            path.dirname += '/img';
        }))
        .pipe(publisher.publish(headers))
        .pipe(awspublish.reporter());
});