module.exports = function (grunt) {

	grunt.initConfig({
		watch : {
			scripts : {
				files : ['examples/*.js'],
				tasks : ['shell'],
			}
		},
		shell : {
			target : {
				command : 'phantomjs.exe run-qunit.js examples/exampleloader.html'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-shell');
	grunt.registerTask('default', ['watch']);
};
