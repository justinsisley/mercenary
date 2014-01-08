module.exports = function(grunt) {
	'use strict';

	var config = require('./server/config');

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
				src: ['client/less/utils/reset.less', 'client/less/**/!(reset).less'],
				dest: 'tmp/dist.less'
			}
		},
		less: {
			dev: {
				files: {
					'client/css/style.css': 'tmp/dist.less'
				}
			},
			prd: {
				options: {
					cleancss: true
				},
				files: {
					'client/css/style.css': 'tmp/dist.less'
				}
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
				'client/js/modules/**/collections/*.js',
				'client/js/modules/**/controllers/*.js',
				'client/js/modules/**/models/*.js',
				'client/js/modules/**/routers/*.js',
				'client/js/modules/**/views/*.js',
				'client/js/widgets/*.js',
				'client/js/test/**/*.js',
				'client/js/_data/**/*.js',
				'client/js/*.js',
				'server/controllers/**/*.js',
				'server/routers/**/*.js',
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
						dest: 'js/app.' + config.ASSETS.JS.REVISION + '.js',
						gzip: true
					},
					{
						src: 'client/css/style.css',
						dest: 'css/style.' + config.ASSETS.CSS.REVISION + '.css',
						gzip: true
					},
					{
						src: 'client/css/fonts.css',
						dest: 'css/fonts.' + config.ASSETS.CSS_FONT.REVISION + '.css',
						gzip: true
					},
					{
						src: 'client/css/fonts-' + config.ASSETS.CSS_FONT.REVISION + '/*',
						dest: 'css/fonts-' + config.ASSETS.CSS_FONT.REVISION + '/',
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