module.exports = function(grunt) {
    grunt.config('bump', {
        options: {
            files: ['package.json', 'utils/bower/bower.json'],
            updateConfigs: [],
            commit: false,
            commitMessage: 'Release v%VERSION%',
            commitFiles: ['package.json', 'utils/bower/bower.json'], // '-a' for all files
            createTag: false,
            tagName: 'v%VERSION%',
            tagMessage: 'Version %VERSION%',
            push: false,
            pushTo: 'upstream',
            gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d' // options to use with '$ git describe'
        }
    });

    grunt.loadNpmTasks('grunt-bump');
};