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
            command: 'nodemon server/main',
            options: options
        }
    });

    grunt.loadNpmTasks('grunt-shell');
};