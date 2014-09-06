var gulp    = require('gulp');
var bump    = require('gulp-bump');
var files   = ['./bower.json', './package.json'];

function bumpVersion(type) {
    return gulp.src(files)
        .pipe(bump({type: type}))
        .pipe(gulp.dest('./'));
}

gulp.task('bump', function(){
    return bumpVersion('patch');
});

gulp.task('bump-minor', function(){
    return bumpVersion('minor');
});

gulp.task('bump-major', function(){
    return bumpVersion('major');
});