var gulp    = require('gulp');
var bump    = require('gulp-bump');
var files   = ['./bower.json', './package.json'];

function bumpVersion(type) {
    return gulp.src(files)
        .pipe(bump({type: type}))
        .pipe(gulp.dest('./'));
}

gulp.task('bump', function() {
    bumpVersion('patch');
});

gulp.task('bump-minor', function() {
    bumpVersion('minor');
});

gulp.task('bump-major', function() {
    bumpVersion('major');
});