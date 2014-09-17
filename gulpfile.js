var gulp        = require('gulp');
var requireDir  = require('require-dir');
var runSequence = require('run-sequence');
var config      = require('./utils/gulp/config');

requireDir('./utils/gulp');

gulp.task('watch', function() {
    gulp.watch(config.jsSrc, ['jshint']);
    gulp.watch(config.lessSrc, ['less-dev']);
    gulp.watch(config.templates, ['dust']);
});

gulp.task('default', [
    'git-hash',
    'jshint',
    'dust',
    'css-lib-dev',
    'less-dev'
]);

gulp.task('dev', function() {
    runSequence(
        'default',
        'watch',
        'server-node'
    );
});

gulp.task('devi', function() {
    runSequence(
        'default',
        'watch',
        'server-debug'
    );
});

gulp.task('devd', function() {
    runSequence(
        'default',
        'watch',
        'server-nodemon'
    );
});

gulp.task('cdn', function(cb) {
    runSequence(
        'tmp-cleanup',
        'git-hash',
        'requirejs',
        'less-prd',
        'css-lib-prd',
        'img-min',
        's3-js',
        's3-css',
        's3-fonts',
        's3-img',
        'tmp-cleanup',
        cb
    );
});