module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'src/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // },
    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          config: 'config.rb',
          bundleExec: true,
          dryRun: true,
          sassDir: 'scss',
          cssDir: 'css',
          environment: 'production'
        }
      }
    //   dev: {                    // Another target
    //     options: {
    //       sassDir: 'scss',
    //       cssDir: 'css'
    //     }
    //   }
    // },
    },
    assemble: {
      options: {
        assets: "path/to/assets",
        data:   "path/to/config.json"
      },
      project: {
        options: {
          layout: "path/to/default-layout.hbs",
          partials: "path/to/partials/**/*.hbs"
        },
        files: {
          'dest': "path/to/pages/**/*.hbs"
        }
      }
    }
  });
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('assemble');

  // Default task(s).
  grunt.registerTask('default', ['compass']);

  // production task(s)
  // grunt.registerTask('default', ['uglify', 'compass', 'assemble']);
}
