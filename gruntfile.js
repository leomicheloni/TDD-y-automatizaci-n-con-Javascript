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
	grunt.registerTask('test', function(){
		console.log('ok');
	});
	grunt.registerTask('default', ['watch']);
};
