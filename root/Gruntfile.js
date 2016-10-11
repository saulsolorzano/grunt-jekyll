module.exports = function(grunt) {

	"use strict";

	// Automaticamente carga las tareas
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Configuración
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			dev: {
				src: ['js/*.js']
			}
		},
		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: ['bower_components/jquery/dist/jquery.js', 'bower_components/jquery-validation/dist/jquery.validate.js', '_js/plugins/validate.js', '_js/plugins/popup.js', '_js/main.js'],
				dest: '_js/app.js'
			}
		},
		uglify: {
			production: {
				options: {
					mangle: true,
					compress: true,
					banner: '/*! Author: Agencia Digital Reactor\n' +
						' * v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>' +
						' * Copyright (c) <%= grunt.template.today("yyyy") %>;' +
						' */\n'
				},
				files: {
					'js/app.min.js': ['_js/app.js']
				}
			}
		},
		sass: {
			options: {
				sourceMap: true,
				outputStyle: 'expanded'
			},
			dev: {
				src: '_sass/main.scss',
				dest: 'css/main.css'
			}
		},
		sassyclean: {
			options: {
				modules: ['_sass/base/**/*.scss', '_sass/generic/**/*.scss', '_sass/objects/**/*.scss', '_sass/vendor/**/*.scss'],
				buildfiles: ['_sass/**/*.scss'],
				remove: false,
				days: null
			},
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 9']
			},
			dev: {
				src: 'css/main.css',
				dest: 'css/main.css'
			}
		},
		svgstore: {
			options: {
				prefix : "shape-",
				cleanup: true,
				svg: {
					style: "display: none;"
				}
			},
			default: {
				files: {
					"_includes/svg-defs.svg": ["_svgs/*.svg"]
				}
			}
		},
		jekyll: {
			build: {
				dest: '_site'
			}
		},
		watch: {
			options: {
                spawn: false
            },
			scripts: {
				files: ['_js/plugins/validate.js', '_js/main.js'],
				tasks: ['concat', 'uglify', 'jekyll']
			},
			svgs: {
				files: ['_svgs/*.svg'],
				tasks: ['svgstore']
			},
			styles: {
				files: ['_sass/**/*.scss'],
				tasks: ['sass', 'autoprefixer', 'jekyll', 'bsReload:css']
			},
			pages: {
				files: ['_includes/*.html','_layouts/*.html','*.{html,md,php}'],
				tasks: ['jekyll', 'bsReload:all']
			}
		},
		browserSync: {
			dev: {
				options: {
					background: true,
					proxy: ""
				}
			}
		},
		bsReload: {
            css: {
                reload: "_site/css/main.css"
            },
            all: {
                reload: true
            }
        }

	});

	grunt.registerTask('default', ['jekyll', 'browserSync', 'watch']);
	//grunt.registerTask('serve', ['shell:jekyllServe']);
	grunt.registerTask('dev', ['sass', 'autoprefixer', 'concat', 'uglify', 'shell:devBuild']);
	//grunt.registerTask('prod', ['shell:prodBuild']);
	//grunt.registerTask('local', ['shell:jekyllBuild']);
};