var gulp        = require('gulp');
var shell       = require('gulp-shell');
var rjs         = require('gulp-requirejs');
var uglify      = require('gulp-uglify');
var runSequence = require('run-sequence');
var config      = require('../../config');

var git = require('gulp-git');
function revParse(cb) {
    var args = '--short=14 --quiet HEAD';

    git.revParse({args: args}, cb);
}

gulp.task('requirejs-convert',
    shell.task(['r.js -convert client/js/ tmp/js']));

gulp.task('copy-dependencies',
    shell.task(['cp -R client/vendor/ tmp/vendor; cp -R client/dust/ tmp/dust']));

gulp.task('requirejs-build', function() {
    revParse(function(err, hash) {
        rjs({
            baseUrl: 'tmp/js',
            name: 'main',
            mainConfigFile: 'tmp/js/config.js',
            include: ['requireLib'],
            insertRequire: [
                'main'
            ],
            out: 'app.' + hash + '.js',
            preserveLicenseComments: false
        })
        .pipe(uglify())
        .pipe(gulp.dest('tmp'));
    });
});

gulp.task('requirejs', function(cb) {
    runSequence('requirejs-convert', 'copy-dependencies', 'requirejs-build');

    cb();
});