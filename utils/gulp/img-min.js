var gulp        = require('gulp');
var imagemin    = require('gulp-imagemin');
var pngcrush    = require('imagemin-pngcrush');
var config      = require('./config');

gulp.task('img-min', function () {
    return gulp.src(config.images)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('tmp/img'));
});