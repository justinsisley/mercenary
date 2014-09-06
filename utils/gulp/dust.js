var gulp    = require('gulp');
var concat  = require('gulp-concat');
var wrapper = require('gulp-wrapper');
var dust    = require('gulp-dust');
var config  = require('./config');

gulp.task('dust', function() {
    gulp.src(config.templates)
        .pipe(dust({
            name: function (file) {
                return file.relative.replace('.dust', '');
            }
        }))
        .pipe(concat(config.compiledTemplatesName))
        .pipe(wrapper({
            header: 'define(["dust"], function() {',
            footer: '});'
        }))
        .pipe(gulp.dest(config.compiledTemplatesDir));
});