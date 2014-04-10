module.exports = function(grunt) {
    grunt.initConfig({pkg: grunt.file.readJSON('package.json')});

    grunt.loadTasks('utils/grunt-tasks');

    grunt.registerTask('default', [
        'jshint',
        'concat:less',
        'recess',
        'less:dev',
        'less:prd',
        'dustpile',
        'clean:tmp'
    ]);

    grunt.registerTask('dev', ['default', 'watch']);

    // Run the server with Node.
    grunt.registerTask('serve', ['shell:serve']);

    // Run the server with nodemon, restarting it when
    // any changes are made.
    grunt.registerTask('serve-dev', ['shell:serveDev']);

    grunt.registerTask('test', ['connect:test', 'shell:test']);

    grunt.registerTask('cdn', [
        'jshint',
        'test',
        'concat:less',
        'recess',
        'less:prd',
        'requirejs',
        's3',
        'clean:tmp'
    ]);
};