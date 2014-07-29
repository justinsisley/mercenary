var gulp        = require('gulp');
var fs          = require('fs');
var CONFIG_FILE = 'config/index.js';

function bump(string, pattern) {
    var regex = new RegExp("(" + pattern + "[ ]*:[ ]*)([0-9|A-a|.|-]*)", 'i');

    var newString = string.replace(regex, function(match, left, center) {
        center = center.replace('.', '');
        center = center.replace(',', '');

        revision = ++center;

        return left + revision;
    });

    return newString;
}

gulp.task('revision-js', function() {
    fs.readFile(CONFIG_FILE, {
        encoding: 'utf8'
    }, function(err, data) {
        if (err) throw err;

        var configFile = data;

        fs.writeFile(CONFIG_FILE, bump(configFile, 'javascript'), function(err) {
            if (err) throw err;
            
            console.log('JavaScript revision number bumped.');
        });
    });
});

gulp.task('revision-css', function() {
    fs.readFile(CONFIG_FILE, {
        encoding: 'utf8'
    }, function(err, data) {
        if (err) throw err;

        var configFile = data;

        fs.writeFile(CONFIG_FILE, bump(configFile, 'css'), function(err) {
            if (err) throw err;
            
            console.log('CSS revision number bumped.');
        });
    });
});