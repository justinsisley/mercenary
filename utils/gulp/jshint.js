var gulp    = require('gulp');
var jshint  = require('gulp-jshint');
var beep    = require('beepbeep');
var map     = require('map-stream');
var config  = require('./config');

var beepOnError = function() {
    return map(function(file, cb) {
        if (!file.jshint.success) {beep();}

        cb(null, file);
    });
};

gulp.task('jshint', function() {
    return gulp.src(config.jsSrc)
        .pipe(jshint())
        .pipe(beepOnError())
        .pipe(jshint.reporter('jshint-stylish'));
});