var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var config  = require('./config');

gulp.task('jshint', function() {
    return gulp.src(config.jsSrc)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});