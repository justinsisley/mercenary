var gulp        = require('gulp');
var shell       = require('gulp-shell');
var rjs         = require('gulp-requirejs');
var uglify      = require('gulp-uglify');
var git         = require('gulp-git');
var runSequence = require('run-sequence');
var config      = require('../../config');

function revParse(cb) {
    var args = '--short=14 --quiet HEAD';

    git.revParse({args: args}, cb);
}

gulp.task('requirejs-convert', function() {
    return gulp.src('').pipe(shell([
        'node_modules/requirejs/bin/r.js -convert client/js tmp/js'
    ]));
});

gulp.task('copy-templates', function() {
    return gulp.src(['client/dust/**/*'])
        .pipe(gulp.dest('tmp/dust'));
});

gulp.task('copy-vendor', function() {
    return gulp.src(['client/vendor/**/*'])
        .pipe(gulp.dest('tmp/vendor'));
});

gulp.task('requirejs-build', function(cb) {
    revParse(function(err, hash) {
        rjs({
            name: 'main',
            baseUrl: 'tmp/js',
            include: ['requireLib'],
            insertRequire: ['main'],
            out: 'app.' + hash + '.js',
            mainConfigFile: 'tmp/js/config.js',
            preserveLicenseComments: false
        })
        .pipe(uglify())
        .pipe(gulp.dest('tmp'));

        cb(); 
    });
});

gulp.task('requirejs', function(cb) {
    runSequence(
        'requirejs-convert',
        'copy-templates',
        'copy-vendor',
        'requirejs-build',
        cb
    );
});