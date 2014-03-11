module.exports = function(grunt) {
    grunt.config('requirejs', {
        compile: {
            options: {
                baseUrl: 'client/js',
                name: 'main',
                mainConfigFile: 'client/js/config.js',
                include: ['requireLib'],
                insertRequire: [
                    'main'
                ],
                out: 'tmp/app.js',
                preserveLicenseComments: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
};