module.exports = function(grunt) {
    grunt.config('less', {
        dev: {
            src: [
                'client/vendor/bootstrap/dist/css/bootstrap.css',
                'tmp/dist.less'
            ],
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
                // Reset disabled. Using Bootstrap 3.
                // 'client/less/utils/reset.less',
                'client/less/**/!(reset).less'
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