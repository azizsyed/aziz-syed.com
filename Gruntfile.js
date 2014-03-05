module.exports = function (grunt) {
  var loadNpmTasks = function () {
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
    },
    watch: {
      jshint: {
        files: '<%= jshint.all %>',
        tasks: ['jshint'],
        options: {}
      },
      scripts: {
        files: 'workspace/scripts/**/*.js',
        tasks: ['copy:scripts']
      },
      styles: {
        files: '<%= compass.dev.options.sassDir %>/**/*.scss',
        tasks: ['compass:dev']
      },
      templates: {
        files: 'workspace/templates/**/*.*',
        tasks: ['assemble']
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
      options: {
        cssDir: 'dist/assets/styles',
        environment: 'development',
        force: true
      },
      dev: {
        options: {
          sassDir: 'workspace/scss/project'
        }
      },
      fontawesome: {
        options: {
          sassDir: ['components/font-awesome/scss']
        }
      },
      bootstrap: {
        options: {
          sassDir: ['components/bootstrap-sass/lib']
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'dist',
          keepalive: true,
          debug: true
        }
      }
    },
    copy: {
      bootstrap: {
        cwd: 'components/bootstrap-sass/fonts',
        src: '**',
        expand: true,
        dest: 'dist/assets/fonts/'
      },
      fontawesome: {
        cwd: 'components/font-awesome/fonts',
        src: '**',
        expand: true,
        dest: 'dist/assets/fonts/'
      },
      scripts: {
        cwd: 'workspace/scripts',
        src: '**/*.js',
        expand: true,
        dest: 'dist/assets/scripts'        
      },
      threejs: {
        cwd: 'components/threejs/src',
        src: '**',
        expand: true,
        dest: 'dist/assets/scripts/lib/threejs'        
      },
      images: {
        files: [
          {
            cwd: 'components/threejs/examples/textures',
            expand: true,
            src: ['planets/*.*', 'land_ocean_ice_cloud_2048.jpg'],
            dest: 'dist/assets/images/textures'
          }
        ]
      }
    },
    clean: {
      dist: ['dist']
    },
    assemble: {
      options: {
        prettify: {
          indent: 2
        },
        plugins: ['assemble-contrib-permalinks','assemble-contrib-sitemap'],
        permalinks: {
          preset: 'pretty'
        },
        sitemap: {
          changefreq: 'monthly',
          exclude: ['']
        },
        assets: 'dist/assets',
        partials: ['workspace/templates/partials/**/*.hbs'],
        helpers: ['helper-moment','templates/helpers/helper-*.js'],
        layout: 'default.hbs',
        layoutdir: 'workspace/templates/layouts',
        data: ['workspace/templates/data/*.{json,yml}']
      },
      pages: { expand: true, cwd: 'workspace/templates/pages', src: ['**/*.hbs'], dest: 'dist' }
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.azizsyed.com',
          port: 21,
          authKey: 'key1'
        },
        src: 'dist',
        dest: '',
        exclusions: []
      }
    }
  });

  //Load plugins
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.loadNpmTasks("assemble");

  grunt.registerTask('build', ['jshint', 'clean', 'compass', 'copy', 'assemble']);

  // Default task.
  grunt.registerTask('default', ['build']);

  grunt.registerTask('deploy', ['build', 'ftp-deploy']);
};