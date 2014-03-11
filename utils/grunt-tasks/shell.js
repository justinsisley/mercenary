module.exports = function(grunt) {
    grunt.config('shell', {
        test: {
            command: 'mocha-phantomjs -R spec http://localhost:9001/test/testrunner.html',
            options: {
                stdout: true,
                stderr: true
            }
        },
        serve: {
            command: 'npm start',
            options: {
                stdout: true,
                stderr: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
};