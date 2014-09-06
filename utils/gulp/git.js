var gulp        = require('gulp');
var git         = require('gulp-git');
var fs          = require('fs');
var CONFIG_FILE = 'config/index.js';

function revParse(cb) {
    var args = '--short=14 --quiet HEAD';

    git.revParse({args: args}, cb);
}

function readConfigFile(cb) {
    var encoding = 'utf8';

    fs.readFile(CONFIG_FILE, {encoding: encoding}, cb);
}

function updateConfigFile(configFileData, cb) {
    var pattern = /revision\s*:\s*'\S*'/i;

    revParse(function(err, hash) {
        var revision        = '\'' + hash + '\'';
        var newConfigFile   = configFileData.replace(pattern, 'revision: ' + revision);

        fs.writeFile(CONFIG_FILE, newConfigFile, cb);
    });
}

function logUpdateToConsole() {
    var d       = new Date();
    var hours   = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();

    if (hours   < 10) {hours   = '0' + hours;}
    if (minutes < 10) {minutes = '0' + minutes;}
    if (seconds < 10) {seconds = '0' + seconds;}

    var timestamp = hours + ':' + minutes + ':' + seconds;
    
    console.log('[' + timestamp + '] Revision number updated.');
}

function updateRevision() {
    readConfigFile(function(err, configFileData) {
        if (err) throw err;

        updateConfigFile(configFileData, function(err) {
            if (err) throw err;

            logUpdateToConsole();
        });
    });
}

gulp.task('git-hash', updateRevision);