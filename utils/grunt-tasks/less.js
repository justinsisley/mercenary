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
                // 'client/vendor/bootstrap/dist/css/bootstrap.css',
                'client/vendor/_nonBower/bootswatch/bootstrap-yeti.min.css',
                'client/font/fontello/css/fontello.css',
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
                'client/less/utils/!(reset).less',
                'client/less/theme/*.less',
                'client/less/elements/*.less',
                'client/less/widgets/*.less',
                'client/less/base/*.less',
                'client/less/modules/**/*.less'
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