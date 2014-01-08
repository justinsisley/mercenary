var gulp                = require('gulp'),
    concat              = require('gulp-concat'),
    recess              = require('gulp-recess'),
    less                = require('gulp-less'),
    csso                = require('gulp-csso'),
    jshint              = require('gulp-jshint'),
    liveReload          = require('gulp-livereload'),
    liveReloadServer    = require('tiny-lr')(),
    mocha               = require('gulp-mocha');

gulp.task('less', function() {
    gulp.src(['client/less/utils/reset.less', 'client/less/**/!(reset).less'])
        .pipe(concat('style.less'))
        .pipe(recess())
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest('client/css/'))
        .pipe(liveReload(liveReloadServer))
});

gulp.task('js-hint', function() {
    gulp.src([
        'Gruntfile.js',
        'client/js/modules/**/collections/*.js',
        'client/js/modules/**/controllers/*.js',
        'client/js/modules/**/models/*.js',
        'client/js/modules/**/routers/*.js',
        'client/js/modules/**/views/*.js',
        'client/js/widgets/*.js',
        'client/js/test/**/*.js',
        'client/js/_data/**/*.js',
        'client/js/*.js',
        'server/controllers/**/*.js',
        'server/routers/**/*.js',
        'server/*.js'
    ])
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('default'));
});

gulp.task('default', function() {
    liveReloadServer.listen(35729, function (err) {
        if (err) {
            return console.log(err);
        }

        gulp.watch('client/less/**/*.less', function(event) {
            gulp.run('less');
        });
    });

    gulp.watch([
        '!client/js/modules/**/templates/**',
        'client/js/**/*.js',
        'client/js/*.js',
        'server/**/*.js',
        'server/*.js'
    ], function(event) {
        gulp.run('js-hint');
    });
});