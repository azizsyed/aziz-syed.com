module.exports = function (grunt) {
    var loadNpmTasks = function () {
        grunt.loadNpmTasks('grunt-compass');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-jasmine');
        grunt.loadNpmTasks('grunt-bower-task');
        grunt.loadNpmTasks('grunt-type');
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */',
            src: 'deploy/assets/scripts/modules/*.js',
            specs: 'workspace/test/specs/**/*.js'
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
                    targetDir: './',
                    cleanup: false,
                    install: true
                }
            }
        },
        compass: {
            all: {
                src: 'workspace/scss',
                dest: 'deploy/assets/css/lib',
                outputstyle: 'expanded',
                linecomments: true
            },
            dev: {
                src: 'workspace/scss/aziz-syed.com',
                dest: 'deploy/assets/css',
                outputstyle: 'expanded',
                linecomments: true
            }
            /*
			TODO: Add build for libs (bootstrap, etc...),
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
            all: ['Gruntfile.js', 'deploy/assets/scripts/*.js', 'deploy/assets/scripts/modules/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        templates: {
            dev: {
                options: {
                    engine: "handlebars",
                    language: "en-us",
                    flatten: false,
                    production: false,
                    layout: 'workspace/templates/layout.mustache',
                    partials: 'workspace/templates/partials/**/*.mustache',
                    data: ['workspace/templates/data/**/*.json']
                },
                files: {
                    'deploy/': ['workspace/templates/pages/**/*.mustache']
                }
            }
        },
        jasmine: {
            src: '<%= meta.src %>',
            options: {
                specs: '<%= meta.specs %>',
                vendor: ['deploy/assets/scripts/lib/jquery/*.js'],
                junit: {
                    path: 'workspace/test/junit',
                    consolidate: true
                }
            }
        },
        type: {
            compile: {
                files: {
                    'deploy/assets/scripts/modules/sample.js': ['workspace/scripts/sample.ts']
                },
                options: {
                    basePath: 'test',
                    target: 'ES5'
                }
            },
            options: {
                //basePath: 'test'
                module: 'amd',
                comments: false,
                style: 'eqeqeq;bitwise',
                noresolve : true
            }
        },
        uglify: {}
    });

    loadNpmTasks();

    //Load task config files; from the 'tasks' subfolder
    grunt.loadTasks('tasks');

    grunt.registerTask('lint', ['jshint']);
    grunt.registerTask('compass-dev', ['compass:dev']);
    grunt.registerTask('build', ['bower:install', 'compass:all', 'templates']);

    // Default task.
    grunt.registerTask('default', ['lint', 'compass-dev', 'templates']);
    grunt.registerTask('test', ['jasmine']);
};