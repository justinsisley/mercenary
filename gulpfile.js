var gulp        = require('gulp');
var requireDir  = require('require-dir');
var runSequence = require('run-sequence');
var config      = require('./utils/gulp/config');

requireDir('./utils/gulp');

gulp.task('watch', function() {
    gulp.watch(config.jsSrc, ['jshint', 'revision-js']);
    gulp.watch(config.lessSrc, ['less-dev', 'revision-css']);
    gulp.watch(config.templates, ['dust']);
});

gulp.task('default', [
    'jshint',
    'dust',
    'css-lib-dev',
    'less-dev'
]);

gulp.task('dev', function() {
    runSequence('default', 'watch', 'server-node');
});

gulp.task('devdebug', function() {
    runSequence('default', 'watch', 'server-debug');
});

gulp.task('devdemon', function() {
    runSequence('default', 'watch', 'server-nodemon');
});