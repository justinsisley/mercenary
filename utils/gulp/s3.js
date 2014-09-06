var gulp        = require('gulp');
var rename      = require('gulp-rename');
var awspublish  = require('gulp-awspublish');
var config      = require('../../config');
var publisher   = awspublish.create(config.secrets.amazonS3);
var headers     = {'Cache-Control': 'max-age=87091200000, no-transform, public'};

function publish(src, destination) {
    return gulp.src(src)
        .pipe(rename(function(path) {
            path.dirname += destination;
        }))
        .pipe(publisher.publish(headers))
        .pipe(awspublish.reporter());
}

gulp.task('s3-css', function(cb) {
    publish('./tmp/*.css', '/css');

    cb();
});

gulp.task('s3-js', function(cb) {
    publish('./tmp/*.js', '/js');

    cb();
});

gulp.task('s3-fonts', function(cb) {
    publish('./client/fonts/*', '/fonts');

    cb();
});

gulp.task('s3-img', function(cb) {
    publish('./client/img/*', '/img');

    cb();
});