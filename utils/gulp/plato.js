var gulp    = require('gulp');
var plato   = require('gulp-plato');
var config  = require('./config');

gulp.task('plato', function() {
    gulp.src(config.jsSrc)
        .pipe(plato('report', {
            jshint: {
                options: {
                    strict: true
                }
            },
            complexity: {
                trycatch: true
            }
        }));
});