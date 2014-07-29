var gulp    = require('gulp');
var nodemon = require('gulp-nodemon');
var shell   = require('gulp-shell');

gulp.task('server-node', shell.task(['node server/main.js']));

gulp.task('server-debug', shell.task(['node-debug server/main.js']));

gulp.task('server-nodemon', function() {
    return nodemon({
        script: 'server/main.js',
        watch: ['server']
    });
});