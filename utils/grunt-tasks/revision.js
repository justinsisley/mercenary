/*
* Increase revision number
*/
module.exports = function(grunt) {
    var fs = require('fs');

    grunt.registerTask('revision', 'Increment the revision number.', function(type) {
        var CONFIG_FILE = 'server/config.js',
            configFile = grunt.file.read(CONFIG_FILE),
            revision;

        function bump(pattern) {
            var regex = new RegExp("(" + pattern + "[ ]*:[ ]*)([0-9|A-a|.|-]*)", 'i');

            var configFileContents = configFile.replace(regex, function(match, left, center) {
                center = center.replace('.', '');
                center = center.replace(',', '');

                revision = ++center;

                return left + revision;
            });

            grunt.file.write(CONFIG_FILE, configFileContents);
        }

        if (type === 'js') {
            bump('JAVASCRIPT_VERSION');
            
            grunt.log.ok('JavaScript revision bumped to ' + revision);
        } else if (type === 'css') {
            bump('CSS_VERSION');
            
            grunt.log.ok('CSS revision bumped to ' + revision);
        } else {
            grunt.log.error('Nothing changed. Specify a revision type.');
        }
    });
};