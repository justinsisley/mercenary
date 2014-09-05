var gulp    = require('gulp');
var bump    = require('gulp-bump');
var files   = ['./bower.json', './package.json'];

gulp.task('bump', function(){
    return gulp.src(files)
        .pipe(bump())
        .pipe(gulp.dest('./'));
});

gulp.task('bump-minor', function(){
    return gulp.src(files)
        .pipe(bump({type: 'minor'}))
        .pipe(gulp.dest('./'));
});

gulp.task('bump-major', function(){
    return gulp.src(files)
        .pipe(bump({type: 'major'}))
        .pipe(gulp.dest('./'));
});