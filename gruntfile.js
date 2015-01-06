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
	
	//test task, only for using with travis CI service
	grunt.registerTask('test', function(){
		console.log('ok');
	});
	
	//default task, allows to run grunt command without specify any name
	grunt.registerTask('default', ['watch']);
};
