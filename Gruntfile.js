module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Metadata
    meta: {
      license: '<%= _.pluck(pkg.licenses, "type").join(", ") %>',
      copyright: 'Copyright (c) <%= grunt.template.today("yyyy") %>',
      banner:
        '/* \n' +
        ' * <%= pkg.name %> v<%= pkg.version %> \n' +
        ' * http://assemble.io \n' +
        ' * \n' +
        ' * <%= meta.copyright %>, <%= pkg.author.name %> \n' +
        ' * Licensed under the <%= meta.license %> License. \n' +
        ' * \n' +
        ' */ \n\n'
    },
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
      dev: {                   // Target
        options: {              // Target options
          config: 'config.rb',
          bundleExec: true,
          dryRun: true, //
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
        pkg: '<%= pkg %>',
        assets: 'dist/assets',
        data:   'app/_data/*.json',
        layoutdir: 'app/_layout',
        partials: 'app/_partial/*.hbs'
      },
      dev: {
        options: {
          assets: 'dev/assets',
          ext: '.html'
        },
        files: {
          'dev/': ['app/_page/*.hbs']
        }
      }
    },
    clean: {
      dev: ['dev/*.{html,md}']
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
  grunt.registerTask('default', ['clean:dev', 'compass:dev', 'assemble:dev']);

  // production task(s)
  // grunt.registerTask('default', ['uglify', 'compass', 'assemble']);
}
