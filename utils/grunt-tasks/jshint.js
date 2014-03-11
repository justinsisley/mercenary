module.exports = function(grunt) {
    grunt.config('jshint', {
        options: {
            jshintrc: '.jshintrc'
        },
        client: [
            'Gruntfile.js',
            'client/js/helpers/*.js',
            'client/js/modules/**/collections/*.js',
            'client/js/modules/**/controllers/*.js',
            'client/js/modules/**/models/*.js',
            'client/js/modules/**/routers/*.js',
            'client/js/modules/**/views/*.js',
            'client/js/widgets/*.js',
            'client/js/*.js',
            'server/**/*.js',
            'server/*.js'
        ]
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
};