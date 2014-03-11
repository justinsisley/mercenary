module.exports = function(grunt) {
    'use strict';
    
    var dust = require('dustjs-linkedin'),
        timeStart = Date.now();

    // Create the task
    grunt.registerMultiTask('dustpile', 'Compile dustjs templates in a particular way.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            separator: "\n\n",
            strip: false,
            tab: '    '
        });

        var tab = options.tab;

        // Iterate over all src-dest file pairs.
        this.files.forEach(function(f) {
            var src = f.src.filter(function(filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    
                    return false;
                } else {
                    return true;
                }
            }).map(function(filepath) {
                // Read file source.
                var src = 'define([\'dust\'], function() {' + "\n";

                // Update file extension
                var name = filepath.replace('.dust', f.ext);
                var templateName = name.replace(f.ext, '');

                // Strip out any strings as passed via the `strip` property
                if (options.strip) {
                    for (var i = 0, len = options.strip.length; i < len; i++) {
                        name = name.replace(options.strip[i], '');
                        templateName = templateName.replace(options.strip[i], '');
                    }
                }

                // Get the parent directory
                var parentDirectory = name.split('/')[0];

                // Get the destination directory
                var destinationDirectory = f.dest.replace('**', parentDirectory);

                // Create the destination file
                var destinationFile = destinationDirectory + name.replace(parentDirectory + '/', '');

                src += options.tab + dust.compile(grunt.file.read(filepath), templateName);

                src += "\n" + '});';

                // Write the destination file.
                grunt.file.write(destinationFile, src);
            });

            // Print a success message.
            grunt.log.writeln('Completed in .' + (Date.now() - timeStart) + 's');
        });
    });

    // Run the task
    grunt.config('dustpile', {
        client: {
            src: ['client/dust/**/*.dust'],
            dest: 'client/js/modules/**/templates/',
            ext: '.js'
        },
        options: {
            strip: ['client/dust/']
        }
    });
};