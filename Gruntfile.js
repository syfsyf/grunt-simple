'use strict';

module.exports = function (grunt) {

	var DIST_DIR = 'dist';

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: ['Gruntfile.js', 'src/js/**/*.js']
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			all_src: {
				options: {
					sourceMap: true,
					sourceMapName: DIST_DIR + '/js/sourceMap.map'
				},
				files: [{
						src: 'src/**/*.js',
						dest: DIST_DIR + '/js/client.js'
					}
				]
			}
		},
		clean: [DIST_DIR],
		serve: {
			options: {
				port: 9001,
				aliases: {
					'app.js': {
						tasks: ['uglify'],
						output: DIST_DIR + '/js/client.js'
					}
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', ['clean','jshint','uglify']);

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-serve');

};
