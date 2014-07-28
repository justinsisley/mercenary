var gulp    = require('gulp');
var concat  = require('gulp-concat');
var wrapper = require('gulp-wrapper');
var dust    = require('gulp-dust');

gulp.task('dust', function () {
    return gulp.src('client/dust/**/*.dust')
        .pipe(dust({
            name: function (file) {
                return file.relative.replace('.dust', '');
            }
        }))
        .pipe(concat('compiled.js'))
        .pipe(wrapper({
            header: 'define(["dust"], function() {',
            footer: '});'
        }))
        .pipe(gulp.dest('client/dust'));
});