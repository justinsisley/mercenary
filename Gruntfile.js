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
        'dustpile',
        'clean:tmp'
    ]);

    // Run all default tasks, start the server with node,
    // and start the file watcher.
    grunt.registerTask('dev', ['default', 'concurrent:nodemon']);
    
    // Run all default tasks, start the server with nodemon,
    // and start the file watcher.
    grunt.registerTask('devdemon', ['default', 'concurrent:nodemon']);

    // Run all default tasks, start the server with node-inspector,
    // and start the file watcher.
    grunt.registerTask('devinspect', ['default', 'concurrent:nodedebug']);

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