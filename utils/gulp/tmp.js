var gulp  = require('gulp');
var shell = require('gulp-shell');

gulp.task('tmp-cleanup',
    shell.task(['rm -rf tmp']));