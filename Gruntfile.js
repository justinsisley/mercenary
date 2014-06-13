module.exports = function(grunt) {
    // Read config data.
    grunt.initConfig({pkg: grunt.file.readJSON('package.json')});

    // Load all of our modularized tasks.
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

    // Run all default tasks, then start
    // the file watcher.
    grunt.registerTask('dev', ['default', 'watch']);

    // Run the server with node.
    grunt.registerTask('serve', ['shell:serve']);
    
    // Run the server with nodemon.
    grunt.registerTask('servedemon', ['shell:servedemon']);

    // Run the server with node-inspector.
    grunt.registerTask('servedebug', ['shell:servedebug']);

    // Launch a connect server and run unit tests.
    grunt.registerTask('test', ['connect:test', 'shell:test']);

    // Build, concatenate, minify, and deploy
    // static files to Amazon S3.
    grunt.registerTask('cdn', [
        'jshint',
        'test',
        'concat:less',
        'recess',
        'less:prd',
        'dustpile',
        'requirejs',
        's3',
        'clean:tmp'
    ]);
};