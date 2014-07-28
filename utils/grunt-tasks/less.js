module.exports = function(grunt) {
    grunt.config('less', {
        dev: {
            src: ['tmp/dist.less'],
            dest: 'client/css/style.css'
        },
        prd: {
            options: {
                cleancss: true
            },
            src: [
                'client/vendor/bootstrap/dist/css/bootstrap.css',
                'tmp/dist.less'
            ],
            dest: 'client/css/style.css'
        }
    });

    grunt.config('concat', {
        less: {
            src: [
                'client/less/utils/*.less',
                'client/less/variables/*.less',
                'client/less/elements/*.less',
                'client/less/modules/**/*.less',
                'client/less/layouts/**/*.less',
                'client/less/widgets/*.less'
            ],
            dest: 'tmp/dist.less'
        }
    });

    grunt.config('recess', {
        app: {
            src: ['tmp/dist.less']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-recess');
};