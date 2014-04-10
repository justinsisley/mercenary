var packageJSON = require('../../package.json'),
    config = require('../../server/config');

module.exports = function(grunt) {
    grunt.config('gitcommit', {
        task: {
            options: {
                message: 'Deploy v' + packageJSON.version + ' (JSv' + config.JAVASCRIPT_VERSION + ', CSSv' + config.CSS_VERSION + ')'
            },
            files: {
                src: ['-a']
            }
        }
    });

    grunt.config('gitpush', {
        target: {
            options: {
                origin: 'heroku',
                branch: 'master'
            }
        }
    });

    grunt.loadNpmTasks('grunt-git');
};