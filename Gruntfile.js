module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Metadata
    bower_dir:'bower_components',
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
          environment: 'development',
        }
      }
    },
    assemble: {
      options: {
        pkg: '<%= pkg %>',
        assets: 'app/assets',
        data:   'app/_data/*.json',
        layoutdir: 'app/_layout',
        layout: 'default.hbs',
        partials: ['app/_partial/*.hbs', 'app/_partial/**/*.hbs'],
        helpers: ['app/_helper/*.js', 'app/_helper/**/*.js'],
        plugins: ['permalinks'],
        permalinks: {
          pattern: ':year/:month/:day/foo:/index.html'
        },
        collections: [{
          title: 'site-sections',
          inflection: 'site-sections' // singular title
        }],
      },
      dev: {
        options: {
          assets: 'dev/assets',
          ext: '.html',
          flatten: true,
          matchBase: true,
          bootstrap: false,
          permalinks: {
            structure: ':basename/index.html' //disable until I can correctly generate links to static assets
            // structure: ':basename:ext'
          }
        },
        files: [{'dev/': ['app/_page/*.hbs', 'app/_page/**/*.hbs']}]
        //[
          //{expand: true, cwd: 'app/_page/', src: ['**/**.hbs'], dest: 'dev/', filter: 'isFile'}, // includes files in path
        //]
      },
      devbootstrap: {
        options: {
          assets: 'dev/assets',
          content: 'dev/content',
          ext: '.html',
          flatten: true,
          // matchBase: true,
          bootstrap: true,
          permalinks: {
            structure: ':basename/index.html' //disable until I can correctly generate links to static assets
            // structure: ':basename:ext'
          },
        },
        files: [
          {expand: true, flatten:true, cwd: 'app/_page/', src: ['*.hbs'], dest: 'dev/', ext: '.html'}
        ]
        //[
          //{expand: true, cwd: 'app/_page/', src: ['**/**.hbs'], dest: 'dev/', filter: 'isFile'}, // includes files in path
        //]
      }
    },
    // imageoptim: {
    //   dev:{
    //     files: ['app/asset/img/'],
    //     options: {
    //       jpegMini: false,
    //       imageAlpha: false,
    //       quitAfter: false
    //     }
    //   }
    // },
    copy: {
      dev: {
        files: [
          {expand: true, flatten: true, src: ['app/asset/font/*'], dest: 'dev/assets/font/', filter: 'isFile'}, // includes files in path
          {expand: true, cwd: 'app/asset/js/', src: ['**'], dest: 'dev/assets/js/', filter: 'isFile'}, // includes files in path
          {expand: true, cwd: 'app/asset/img/', src: ['**'], dest: 'dev/assets/img/', filter: 'isFile'}, // includes files in path
          {expand: true, cwd: 'app/content/', src: ['**'], dest: 'dev/content/', filter: 'isFile'} // includes files in path
          ]
      },
      devbootstrap: {
        files: [
          {expand: true, flatten: true, src: ['app/asset/font/*'], dest: 'dev/assets/font/', filter: 'isFile'}, // includes files in path
          {expand: true, cwd: 'bower_components/bootstrap/dist/js/', src: ['**'], dest: 'dev/assets/js/', filter: 'isFile'}, // includes files in path
          {expand: true, cwd: 'app/asset/img/', src: ['**'], dest: 'dev/assets/img/', filter: 'isFile'}, // includes files in path
          {expand: true, cwd: 'app/content/', src: ['**'], dest: 'dev/content/', filter: 'isFile'} // includes files in path
          ]
      }
    },
    clean: {
      dev: ['dev/**/*.{html,md}']
    },
    bower: {
      target: {
        rjsConfig: 'app/config.js'
      }
    },
    recess: {
      devbootstrap: {
        options: {
          compile: true
        },
        files:[{
            expand:false,
            // cwd:'./',
            // src:['bower_components/bootstrap/less/bootstrap.less'],
            src:['app/asset/less/app.less'],
            dest: 'dev/assets/css/app.css', // lose the brackets
            ext:'.css'
        }]
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
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-imageoptim');
  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-recess');

  // Default task(s).
  grunt.registerTask('default', ['clean:dev', 'copy:dev', 'compass:dev', 'assemble:dev']);
  grunt.registerTask('devbootstrap', ['recess:devbootstrap', 'copy:devbootstrap', 'assemble:devbootstrap', 'bower']);

  // production task(s)
  // grunt.registerTask('default', ['uglify', 'compass', 'assemble']);
}
