module.exports = function(grunt) {
    grunt.config('connect', {
        test: {
            options: {
                port: 9001
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
};