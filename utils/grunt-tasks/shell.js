module.exports = function(grunt) {
    var options = {stdout: true, stderr: true};

    grunt.config('shell', {
        test: {
            command: 'mocha-phantomjs -R spec http://localhost:9001/test/testrunner.html',
            options: options
        },
        serve: {
            command: 'node server/main',
            options: options
        },
        servedemon: {
            command: 'nodemon -w server server/main',
            options: options
        },
        servedebug: {
            command: 'node-debug server/main.js',
            options: options
        },
        requireConvert: {
            command: 'node node_modules/requirejs/bin/r.js -convert client/js/ tmp/js',
            options: options
        },
        copyDeps: {
            command: 'cp -R client/vendor/ tmp/vendor; cp -R client/dust/ tmp/dust',
            options: options
        }
    });

    grunt.loadNpmTasks('grunt-shell');
};