module.exports = function(grunt) {
    grunt.config('requirejs', {
        compile: {
            options: {
                baseUrl: 'tmp/js',
                name: 'main',
                mainConfigFile: 'tmp/js/config.js',
                include: ['requireLib'],
                insertRequire: [
                    'main'
                ],
                out: 'tmp/build.js',
                preserveLicenseComments: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
};