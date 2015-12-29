'use script';
/* global 
  grunt */
module.exports = function (grunt) {
  grunt.log.writeln('Testing');
  grunt.log.oklns('Testing');
  grunt.log.errorlns('Testing');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      build: {
        files: [
          // { src: 'src/*.html', dest: 'build/*.html' },
          {expand: true, cwd: 'src/', src: ['**/*.html'], dest: 'build/'},
          {expand: true, cwd: 'src/', src: ['font/**'], dest: 'build/'},
          {expand: true, cwd: 'src/', src: ['img/**'], dest: 'build/'},
          {expand: true, cwd: 'src/', src: ['js/**'], dest: 'build/'}
        ]
      }
    },
    sass: {
      options: {
        style: 'expanded',
        sourcemap: 'none'
      },
      build: {
        files:  [
          {
            expand: true,
            cwd: 'src/sass',
            src: ['**/*.scss'],
            dest: 'build/css',
            ext: '.css'
          }
        ]
      }
    },
    connect: {
      server: {
        options: {
          keepalive: true,
          hostname: 'localhost',
          port: 4000,
          base: 'build/',
          open: true
        }
      }
    },
    clean: {
      build: {
        src: ['build/']
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass:build'],
        options: {
          livereload: true
        }
      }
    },
    processhtml: {
      build: {
        options: {
          process: true,
          data: {
            sitetitle: 'Wolfhound Media Design Demos'
          }
        },
        files: [
          {expand: true, cwd: 'build/', src: ['*.html'], dest: 'build/'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.registerTask('build',
    [
      'clean:build',
      'sass:build',
      'copy:build',
      'processhtml:build'
    ]);
  grunt.registerTask('default',
    [
      'build'
    ]);
  grunt.registerTask('serve',
    [
      'build',
      'watch'
    ]);
};