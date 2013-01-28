module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },
        concat: {
            dist: {
                src: ['<banner:meta.banner>', '<file_strip_banner:lib/<%= pkg.name %>.js>'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        min: {
            dist: {
                src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            jshint: {
                files: '<%= jshint.all %>',
                tasks: ['jshint'],
                options: {}
            },
            'compass-dev': {
                files: ['deploy/assets/css/scss/*.scss'],
                tasks: ['compass:dev']
            },
            'compass-bootstrap': {
                files: ['deploy/assets/css/scss/bootstrap-sass/*.scss'],
                tasks: ['compass:dev-bootstrap']
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: './deploy/assets',
                    cleanup: false,
                    install: true
                }
            }
        },
        jasmine: {
            all: {
                src: ['tests/SpecRunner.html'],
                errorReporting: true
            }
        },
        compass: {
            'dev-bootstrap': {
                src: 'deploy/assets/css/scss/bootstrap-sass',
                dest: 'deploy/assets/css/output/bootstrap-sass',
                outputstyle: 'expanded',
                linecomments: true
            },
            dev: {
                src: 'deploy/assets/css/scss',
                dest: 'deploy/assets/css/output',
                outputstyle: 'expanded',
                linecomments: true
            }
            /*,
            prod: {
                src: 'development/styles/sass',
                dest: 'development/styles',
                outputstyle: 'compressed',
                linecomments: false,
                forcecompile: true
            }*/
        },
        jshint: {
            all: ['Gruntfile.js', 'deploy/assets/scripts/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
		templates: {
	      components: {
	        options: {
	          engine: "handlebars",
	          language: "en-us",
	          flatten: false,
	          production: false,
	          layout: 'templates/layout.mustache',
	          partials: 'templates/partials/**/*.mustache',
	          data: ['templates/data.json', 'templates/partials/**/*.json']
	        },
	        files: {
	          'html/': ['templates/pages/**/*.mustache']
	        }
	      }
	    },
        uglify: {}
    });

    grunt.loadNpmTasks('grunt-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    //grunt.loadNpmTasks('grunt-jasmine-task');
    grunt.loadNpmTasks('grunt-bower-task');

	//Load task config files; from the 'tasks' subfolder
	grunt.loadTasks('tasks');

    grunt.registerTask('compass-dev', ['compass:dev-bootstrap', 'compass:dev']);
    grunt.registerTask('build', ['bower:install', 'compass-dev']);

    // Default task.
    grunt.registerTask('default', ['jshint', 'compass-dev']);
};