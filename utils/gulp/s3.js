var gulp = require('gulp');
var s3 = require('gulp-s3');

gulp.src('./dist/**')
    .pipe(s3({
        'key': 'AKIAI3Z7CUAFHG53DMJA',
        'secret': 'acYxWRu5RRa6CwzQuhdXEfTpbQA+1XQJ7Z1bGTCx',
        'bucket': 'dev.example.com',
        'region': 'eu-west-1'
    }));