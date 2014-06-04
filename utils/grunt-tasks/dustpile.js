module.exports = function(grunt) {
    'use strict';
    
    var dust = require('dustjs-linkedin');
    var timeStart = Date.now();

    // Create the task
    grunt.registerMultiTask('dustpile', 'Compile dustjs templates in a particular way.', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            separator: "\n\n",
            tab: '    '
        });

        var allTemplates = [];

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
                // Update file extension
                var name = filepath.replace('.dust', f.ext);

                // Create the template name
                var templateName = name.replace(f.ext, '');

                // Strip out any strings as passed via the `strip` property
                if (options.strip) {
                    for (var i = 0, len = options.strip.length; i < len; i++) {
                        templateName = templateName.replace(options.strip[i], '');
                    }
                }

                // Compile the template
                var compiledTemplate = dust.compile(grunt.file.read(filepath), templateName)

                // Push the compiled template to the collection
                allTemplates.push(options.tab + compiledTemplate);
            });

            // Write the template collection to a file and wrap
            // the contents with the necessary requirejs syntax.
            grunt.file.write('client/dust/compiled.js', 'define([\'dust\'], function() {' + "\n" + allTemplates.join("\n\n") + "\n" + '});');

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