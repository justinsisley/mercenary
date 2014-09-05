var gulp        = require('gulp');
var git         = require('gulp-git');
var fs          = require('fs');
var CONFIG_FILE = 'config/index.js';

function revParse(cb) {
    git.revParse({
        args: '--short=14 --quiet HEAD'
    }, cb);
}

function updateRevision() {
    fs.readFile(CONFIG_FILE, {
        encoding: 'utf8'
    }, function(err, data) {
        if (err) throw err;

        var configFile = data;

        revParse(function(err, hash) {
            var revision        = '\'' + hash + '\'';
            var regex           = /revision\s*:\s*'\S*'/i;
            var newConfigFile   = configFile.replace(regex, 'revision: ' + revision);

            fs.writeFile(CONFIG_FILE, newConfigFile, function(err) {
                if (err) throw err;
                
                console.log('Revision number updated.');
            });
        });
    });
}

gulp.task('git-hash', function() {
    updateRevision();
});