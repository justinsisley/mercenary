var gulp    = require('gulp');
var bump    = require('gulp-bump');
var files   = ['./bower.json', './package.json'];

function bumpVersion(type) {
    return gulp.src(files)
        .pipe(bump({type: type}))
        .pipe(gulp.dest('./'));
}

gulp.task('bump', function(cb) {
    bumpVersion('patch');

    cb();
});

gulp.task('bump-minor', function(cb) {
    bumpVersion('minor');

    cb();
});

gulp.task('bump-major', function(cb) {
    bumpVersion('major');

    cb();
});