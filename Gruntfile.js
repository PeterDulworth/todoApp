module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

     // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'app/**/*.js', 'config/**/*.js', 'public/*.js', 'server.js']
    },

    // concat: {
    //     options: {
    //         stripBanners: true,
    //         banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */',
    //     },
    //     dist: {
    //         src: ['server.js', 'app/**/*.js', 'config/**/*.js', 'public/**/*.js'],
    //         dest: 'public/dist/applicatoin.js',
    //     },
    // },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'public/dist/js/app.min.js': 'public/js/core.js'
        }
      }
    },
    watch: {
        // for scripts, run jshint and uglify
        scripts: {
            files: '**/**/**/*.js', tasks: ['jshint', 'uglify']
        }
    },
    nodemon: {
        dev: {
            script: 'server.js',
            options: {
                nodeArgs: [],
                ext: 'js,html',
                watch: '**/**/**/*.js'
            }
        }
    },
    concurrent: {
        default: ['nodemon', 'watch'],
        options: {
            logConcurrentOutput: true,
            limit: 10
        }
    },
    env: {
        development: {
          NODE_ENV: 'development'
        },
        production: {
          NODE_ENV: 'production'
        },
        test: {
          NODE_ENV: 'test'
        },
        secure: {
          NODE_ENV: 'secure'
        }
    }
});

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-env');

  grunt.registerTask('default', ['env:development', 'jshint', 'uglify', 'concurrent']);
  grunt.registerTask('production', ['env:production', 'jshint', 'uglify', 'concurrent']);

};