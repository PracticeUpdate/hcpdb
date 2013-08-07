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
    watch:{},
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
          production: false,
          config: 'config.rb',
          bundleExec: true,
          sassDir: 'asset/scss',
          cssDir: '../dev/assets/css',
          environment: 'development'
        }
      }
    },
    assemble: {
      options: {
        pkg: '<%= pkg %>',
        assets: 'dist/assets',
        data:   'app/_data/*.json',
        layoutdir: 'app/_layout',
        layout: 'default.hbs',
        partials: ['app/_partial/*.hbs'],
        collections: [{
          title: 'site-sections',
          inflection: 'site-sections' // singular title
        }]
      },
      dev: {
        options: {
          assets: 'dev/assets',
          ext: '.html',
          flatten: true,
          matchBase: true
        },
        files: {
          'dev/': ['app/_page/*.hbs']
        }
      }
    },
    copy: {
      dev: {
        files: [
          {expand: true, flatten: true, src: ['app/asset/font/*'], dest: 'dev/assets/font/', filter: 'isFile'} // includes files in path
          ]
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
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('assemble');

  // Default task(s).
  grunt.registerTask('default', ['clean:dev', 'copy:dev', 'compass:dev', 'assemble:dev']);

  // production task(s)
  // grunt.registerTask('default', ['uglify', 'compass', 'assemble']);
}
