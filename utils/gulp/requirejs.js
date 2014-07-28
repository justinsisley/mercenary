var gulp        = require('gulp');
var shell       = require('gulp-shell');
var rjs         = require('gulp-requirejs');
var uglify      = require('gulp-uglify');
var runSequence = require('run-sequence');

gulp.task('requirejs-convert',
    shell.task(['r.js -convert client/js/ tmp/js']));

gulp.task('copy-dependencies',
    shell.task(['cp -R client/vendor/ tmp/vendor; cp -R client/dust/ tmp/dust']));

gulp.task('requirejs-build', function() {
    rjs({
        baseUrl: 'tmp/js',
        name: 'main',
        mainConfigFile: 'tmp/js/config.js',
        include: ['requireLib'],
        insertRequire: [
            'main'
        ],
        out: 'build.js',
        preserveLicenseComments: false
    })
    .pipe(uglify())
    .pipe(gulp.dest('tmp'));
});

gulp.task('requirejs-cleanup',
    shell.task(['rm -rf tmp']));

gulp.task('requirejs', function() {
    runSequence('requirejs-convert', 'copy-dependencies', 'requirejs-build');
});