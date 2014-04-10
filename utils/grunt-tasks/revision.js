/*
* Increase revision number
*/
module.exports = function(grunt) {
    var fs = require('fs');

    grunt.registerTask('revision', 'Increment the revision number.', function(type) {
        var CONFIG_FILE = 'server/config.js',
            FONT_CSS_FILE = 'client/css/fonts.css',
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

        // FIXME
        function fontFolders() {
            // Need to get the most up to date version of package.json
            var configFile = grunt.file.read(CONFIG_FILE),
                regex = new RegExp("([\\\'|\\\"]revisionCSSfont[\\\'|\\\"][ ]*:[ ]*[\\\'|\\\"])([\\\d|.|,]*)([\\\'|\\\"])", 'i'),
                version = configFile.match(regex)[2],
                fontCSSfile = grunt.file.read(FONT_CSS_FILE),
                fontCSSfileFind = new RegExp('fonts/icomoon', 'g'),
                fontCSSfileReplace = 'fonts-' + version + '/icomoon',
                fontCSSfileContents = fontCSSfile.replace(fontCSSfileFind, fontCSSfileReplace);

            grunt.file.write(FONT_CSS_FILE, fontCSSfileContents);

            fs.rename('client/css/fonts', 'client/css/fonts-' + version);
        }

        if (type === 'js') {
            bump('JAVASCRIPT_VERSION');
            
            grunt.log.ok('JavaScript revision bumped to ' + revision);
        } else if (type === 'css') {
            bump('CSS_VERSION');
            
            grunt.log.ok('CSS revision bumped to ' + revision);
        } else if (type === 'font') {
            bump('FONT_VERSION');
            
            fontFolders();
            
            grunt.log.ok('Font revision bumped to ' + revision);
        } else {
            grunt.log.error('Nothing changed. Specify a revision type.');
        }
    });
};