module.exports = function(grunt) {
    grunt.config('watch', {
        clientJS: {
            files: [
                'client/js/modules/**/!(templates)/*.js',
                'client/js/helpers/*.js',
                'client/js/widgets/*.js',
                'client/js/*.js'
            ],
            tasks: ['jshint', 'revision:js']
        },
        serverJS: {
            files: [
                'server/**/*.js',
                'server/*.js'
            ],
            tasks: ['jshint']
        },
        otherJS: {
            files: ['Gruntfile.js'],
            tasks: ['jshint']
        },
        less: {
            files: ['client/less/**/*.less'],
            tasks: [
                'concat:less',
                'recess:app',
                'less:dev',
                'revision:css',
                'clean:tmp'
            ]
        },
        css: {
            files: ['client/css/style.css'],
            options: {
                livereload: true
            }
        },
        dust: {
            files: ['client/dust/**/*.dust'],
            tasks: ['dustpile', 'revision:js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
};