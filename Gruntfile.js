module.exports = function(grunt) {
    grunt.initConfig({pkg: grunt.file.readJSON('package.json')});

    grunt.loadTasks('utils/grunt-tasks');

    grunt.registerTask('default', [
        'jshint',
        'concat:less',
        'recess',
        'less:dev',
        'less:prd',
        'clean:tmp'
    ]);

    grunt.registerTask('dev', ['default', 'watch']);
    grunt.registerTask('serve', ['shell:serve']);

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