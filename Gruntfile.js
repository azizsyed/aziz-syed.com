module.exports = function (grunt) {
    var loadNpmTasks = function () {
        grunt.loadNpmTasks('grunt-compass');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-jasmine');
        grunt.loadNpmTasks('grunt-bower-task');
    };

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */',
            src: 'deploy/assets/scripts/modules/*.js',
            specs: 'test/specs/**/*.js'
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
                    targetDir: './',
                    cleanup: false,
                    install: true
                }
            }
        },
        compass: {
            all: {
                src: 'scss',
                dest: 'deploy/assets/css/lib',
                outputstyle: 'expanded',
                linecomments: true
            },
            dev: {
                src: 'scss/aziz-syed.com',
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
            all: ['Gruntfile.js', 'deploy/assets/scripts/*.js'],
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
                    layout: 'templates/layout.mustache',
                    partials: 'templates/partials/**/*.mustache',
                    data: ['templates/data/**/*.json']
                },
                files: {
                    'deploy/': ['templates/pages/**/*.mustache']
                }
            }
        },
        jasmine: {
            src: '<%= meta.src %>',
            options: {
                specs: '<%= meta.specs %>',
                vendor: ['deploy/assets/scripts/lib/jquery/*.js'],
                junit: {
                    path: 'test/junit',
                    consolidate: true
                }
            }
        },
        uglify: {}
    });

    loadNpmTasks();

    //Load task config files; from the 'tasks' subfolder
    grunt.loadTasks('tasks');

    grunt.registerTask('compass-dev', ['compass:dev']);
    grunt.registerTask('build', ['bower:install', 'compass:all', 'templates']);

    // Default task.
    grunt.registerTask('default', ['jshint', 'compass-dev']);
};