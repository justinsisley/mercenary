module.exports = function(grunt) {
    'use strict';

    var packageJSON = require('./package.json');

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-recess');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-s3');
    grunt.loadNpmTasks('grunt-plato');
    
    grunt.loadTasks('utils/grunt-tasks');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            less: {
                src: [
                    // Reset disabled. Using Bootstrap 3.
                    // 'client/less/utils/reset.less',
                    'client/less/**/!(reset).less'
                ],
                dest: 'tmp/dist.less'
            }
        },
        less: {
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
        },
        recess: {
            app: {
                src: ['tmp/dist.less']
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            client: [
                'Gruntfile.js',
                'client/js/helpers/*.js',
                'client/js/modules/**/collections/*.js',
                'client/js/modules/**/controllers/*.js',
                'client/js/modules/**/models/*.js',
                'client/js/modules/**/routers/*.js',
                'client/js/modules/**/views/*.js',
                'client/js/widgets/*.js',
                'client/js/*.js',
                'server/**/*.js',
                'server/*.js'
            ]
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'client/js',
                    name: 'main',
                    mainConfigFile: 'client/js/config.js',
                    include: ['requireLib'],
                    insertRequire: [
                        'main'
                    ],
                    out: 'tmp/app.js',
                    preserveLicenseComments: false
                }
            }
        },
        dustpile: {
            client: {
                src: ['client/dust/**/*.dust'],
                dest: 'client/js/modules/**/templates/',
                ext: '.js'
            },
            options: {
                strip: ['client/dust/']
            }
        },
        clean: {
            tmp: ['tmp']
        },
        shell: {
            test: {
                command: 'mocha-phantomjs -R spec http://localhost:9001/test/testrunner.html',
                options: {
                    stdout: true,
                    stderr: true
                }
            },
            serve: {
                command: 'npm start',
                options: {
                    stdout: true,
                    stderr: true
                }
            }
        },
        watch: {
            clientJS: {
                files: [
                    '!client/js/modules/**/templates/**',
                    'client/js/**/*.js',
                    'client/js/*.js'
                ],
                tasks: ['jshint', 'revision:js']
            },
            serverJS: {
                files: [
                    'server/**/*.js',
                    'server/*.js'
                ],
                tasks: ['jshint']
            },
            otherJS: {
                files: ['Gruntfile.js'],
                tasks: ['jshint']
            },
            less: {
                files: ['client/less/**/*.less'],
                tasks: [
                    'concat:less',
                    'recess:app',
                    'less:dev',
                    'revision:css',
                    'clean:tmp'
                ]
            },
            css: {
                files: ['client/css/style.css'],
                options: {
                    livereload: true
                }
            },
            dust: {
                files: ['client/dust/**/*.dust'],
                tasks: ['dustpile', 'revision:js']
            }
        },
        s3: {
            options: {
                key: '',
                secret: '',
                bucket: '',
                access: 'public-read',
                gzip: true,
                headers: {
                    // 3 years
                    'Cache-Control': 'max-age=87091200000'
                }
            },
            qa: {
                upload: [
                    {
                        src: 'tmp/app.js',
                        dest: 'js/app.' + packageJSON.javascriptVersion + '.js',
                        gzip: true
                    },
                    {
                        src: 'client/css/style.css',
                        dest: 'css/style.' + packageJSON.cssVersion + '.css',
                        gzip: true
                    },
                    {
                        src: 'client/css/fonts.css',
                        dest: 'css/fonts.' + packageJSON.fontVersion + '.css',
                        gzip: true
                    },
                    {
                        src: 'client/css/fonts-' + packageJSON.fontVersion + '/*',
                        dest: 'css/fonts-' + packageJSON.fontVersion + '/',
                        gzip: true
                    }
                ]
            }
        },
        connect: {
            test: {
                options: {
                    port: 9001
                }
            }
        },
        plato: {
            report: {
                options: {
                    jshint: grunt.file.readJSON('.jshintrc')
                },
                files: {
                    'reports': ['<%= jshint.client %>']
                }
            }
        }
    });

    grunt.registerTask('default', [
        'jshint',
        'concat:less',
        'recess',
        'less:dev',
        'less:prd',
        'clean:tmp'
    ]);

    grunt.registerTask('dev', ['default', 'watch']);
    grunt.registerTask('serve', ['shell:serve']);

    grunt.registerTask('test', ['connect:test', 'shell:test']);

    grunt.registerTask('cdn', [
        'jshint',
        'test',
        'concat:less',
        'recess',
        'less:prd',
        'requirejs',
        's3',
        'clean:tmp'
    ]);
};