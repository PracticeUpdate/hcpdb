module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Metadata
    bower_dir:'bower_components',
    paths: {
      app: 'app',
      dev: 'dev',
      dist: 'dist'
    },
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
    watch: {
      less: {
        files: ['<%= paths.app %>/asset/less/**/*.less'],
        tasks: ['recess:devbootstrap']
      },
      html: {
        files: ['<%= paths.app %>/**/*.{hbs,json,md}'],
        tasks: ['assemble:devbootstrap']
      }
    },
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
            src:['<%= paths.app %>/asset/less/app.less'],
            dest: '<%= paths.dev %>/assets/css/app.css', // lose the brackets
            ext:'.css'
        }]
      }
    },
    connect: {
      options: {
        hostname: 'localhost',
        port: 9001

      },
      server: {
        options: {
        base: '<%= paths.dev %>',
        open: true,
        keepalive: true,
        livereload: true,
        }
      }
    }
  });
  // Load the plugin that provides the "uglify" task.


// load npm tasks
  [
    'grunt-contrib-uglify',
    'grunt-contrib-compass',
    'grunt-contrib-imagemin',
    'grunt-contrib-copy',
    'grunt-contrib-watch',
    'grunt-contrib-clean',
    'grunt-contrib-concat',
    'grunt-contrib-requirejs',
    'grunt-contrib-connect',
    'assemble',
    'grunt-imageoptim',
    'grunt-bower-requirejs',
    'grunt-recess',
    'grunt-peon-gui'
  ].forEach(grunt.loadNpmTasks);

  // Default task(s).
  grunt.registerTask('default', ['recess:devbootstrap', 'copy:devbootstrap', 'assemble:devbootstrap', 'bower', 'connect']);

  // production task(s)
  // grunt.registerTask('default', ['uglify', 'compass', 'assemble']);
}
