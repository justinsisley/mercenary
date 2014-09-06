var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('tmp-cleanup', function(cb) {
    shell.task(['rm -rf tmp'])();

    cb();
});