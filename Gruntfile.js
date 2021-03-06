module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: '\n',
      },
      components: {
        src: ['public/client/app.js', 
             'public/client/link.js', 
             'public/client/links.js', 
             'public/client/linkView.js', 
             'public/client/linksView.js', 
             'public/client/createLinkView.js', 
             'public/client/router.js'],
        dest: 'public/dist/components.js'
      },
      libs: {
        src: ['public/lib/jquery.js',
             'public/lib/underscore.js',
             'public/lib/backbone.js',
             'public/lib/handlebars.js'],
        dest: 'public/dist/libs.js'
      }      
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      target: {
        files: {
          'public/dist/libs.min.js': ['public/dist/libs.js']
        }
      }
    },

    eslint: {
      target: [ 'public/client/createLinkView.js' ]
    },

    cssmin: {
        // Add list of files to lint here
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master'
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', function(n) {
    grunt.task.run(['eslint', 'mochaTest', 'concat', 'uglify']);
    if (grunt.option('prod')) {
      grunt.task.run(['shell']);
    }
  });

  grunt.event.on('watch', function() {
    grunt.task.run(['concat', 'uglify']);
  });

};
