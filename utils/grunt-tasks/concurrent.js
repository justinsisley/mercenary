module.exports = function(grunt) {
    grunt.config('concurrent', {
        node: {
            tasks: ['shell:serve', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        nodemon: {
            tasks: ['shell:servedemon', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        nodedebug: {
            tasks: ['shell:servedebug', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-concurrent');
};