/*
* Increase revision number
*/

module.exports = function(grunt) {
    var fs = require('fs');

    grunt.registerTask('revision', 'Increment the revision number.', function(type) {
        var PACKAGE_FILE = 'package.json',
            FONT_CSS_FILE = 'client/css/fonts.css',
            packageFile = grunt.file.read(PACKAGE_FILE),
            revision;

        function bump(pattern) {
            var regex = new RegExp("([\\\'|\\\"]" + pattern + "[\\\'|\\\"][ ]*:[ ]*[\\\'|\\\"])([\\\d|.|,]*)([\\\'|\\\"])", 'i');

            var packageFileContents = packageFile.replace(regex, function(match, left, center, right) {
                center = center.replace('.', '');
                center = center.replace(',', '');

                revision = ++center;

                return left + revision + right;
            });

            grunt.file.write(PACKAGE_FILE, packageFileContents);
        }

        function fontFolders() {
            // Need to get the most up to date version of package.json
            var packageFile = grunt.file.read(PACKAGE_FILE),
                regex = new RegExp("([\\\'|\\\"]revisionCSSfont[\\\'|\\\"][ ]*:[ ]*[\\\'|\\\"])([\\\d|.|,]*)([\\\'|\\\"])", 'i'),
                version = packageFile.match(regex)[2],
                fontCSSfile = grunt.file.read(FONT_CSS_FILE),
                fontCSSfileFind = new RegExp('fonts/icomoon', 'g'),
                fontCSSfileReplace = 'fonts-' + version + '/icomoon',
                fontCSSfileContents = fontCSSfile.replace(fontCSSfileFind, fontCSSfileReplace);

            grunt.file.write(FONT_CSS_FILE, fontCSSfileContents);

            fs.rename('client/css/fonts', 'client/css/fonts-' + version);
        }

        if (type === 'js') {
            bump('revisionJS');
            
            grunt.log.ok('JavaScript revision bumped to ' + revision);
        } else if (type === 'css') {
            bump('revisionCSS');
            
            grunt.log.ok('CSS revision bumped to ' + revision);
        } else if (type === 'font') {
            bump('revisionCSSfont');
            
            fontFolders();
            
            grunt.log.ok('Font revision bumped to ' + revision);
        } else {
            grunt.log.error('Nothing changed. Specify a revision type.');
        }
    });
};