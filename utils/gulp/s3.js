var gulp        = require('gulp');
var rename      = require('gulp-rename');
var awspublish  = require('gulp-awspublish');
var config      = require('../../config');

function publish(src, destination) {
    var publisher = awspublish.create(config.secrets.amazonS3);
    var headers = {'Cache-Control': 'max-age=87091200000, no-transform, public'};

    return gulp.src(src)
        .pipe(rename(function(path) {
            path.dirname += destination;
        }))
        .pipe(publisher.publish(headers))
        .pipe(awspublish.reporter());
}

gulp.task('s3-css', function() {
    return publish('./tmp/*.css', '/css');
});

gulp.task('s3-js', function() {
    return publish('./tmp/*.js', '/js');
});

gulp.task('s3-fonts', function() {
    return publish('./client/fonts/*', '/fonts');
});

gulp.task('s3-img', function() {
    return publish('./client/img/*', '/img');
});