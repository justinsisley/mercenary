var gulp            = require('gulp');
var templateCache   = require('gulp-angular-templatecache');
var cleanhtml       = require('gulp-cleanhtml');
var uglify          = require('gulp-uglify');
var config          = require('./config');

var templateCacheOptions = {
    standalone: true
};

// Concatenate templates
gulp.task('templates-dev', function() {
    return gulp.src(config.templates)
        .pipe(cleanhtml())
        .pipe(templateCache(templateCacheOptions))
        .pipe(gulp.dest('dist/js'));
});

// Concatenate and minify templates
gulp.task('templates-prd', function() {
    return gulp.src(config.templates)
        .pipe(cleanhtml())
        .pipe(templateCache(templateCacheOptions))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});