/*jslint
    white */
/* global
  grunt */
const sass = require('node-sass');

module.exports = function (grunt) {
  'use script';

  // Configs
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      build: {
        files: [
          // {expand: true, cwd: 'src/', src: ['**/*.html'], dest: 'build/'},
          {expand: true, cwd: 'src/', src: ['font/**'], dest: 'build/'},
          {expand: true, cwd: 'src/', src: ['img/**'], dest: 'build/'},
          {expand: true, cwd: 'src/', src: ['js/**'], dest: 'build/'}
        ]
      }
    },
    sass: {
      options: {
        implementation: sass,
        outputStyle: 'compressed',
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
          livereload: true,
          hostname: 'localhost',
          port: 9000,
          base: 'build/',
          open: true
        }
      }
    },
    pug: {
      compile: {
        options: {
          pretty: true
        },
        files: [
          {
            cwd: "src",
            src: ["**/*.pug", "!templates/**/*.pug"],
            dest: "build",
            expand: true,
            ext: ".html"
          }
        ]
      }
    },
    clean: {
      build: {
        src: ['build/']
      }
    },
    watch: {
      files: ['src/**/*'],
      tasks: ['build']
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ftp-push');
  grunt.loadNpmTasks('grunt-contrib-pug');

  // Registered Tasks
  grunt.registerTask('build',
    [
      'clean:build',
      'sass:build',
      'copy:build',
      'pug:compile'
    ]);
  grunt.registerTask('wipe',
    [
      'clean:build'
    ]);
  grunt.registerTask('default',
    [
      'build'
    ]);
  grunt.registerTask('serve',
    [
      'build',
      'connect',
      'watch'
    ]);

  grunt.registerTask('ftp', function(){
    grunt.initConfig({
      hosts: grunt.file.readJSON('host.json'),
      ftp_push: {
        full: {
          options: {
            authKey: "demos",
            host: '<%= hosts.demo.remoteurl %>',
            dest: '<%= hosts.demo.remotedir %>',
            port: 21,
            debug: false
          },
          files: [
            {expand: true,cwd: 'build',src: ['**/*']}
          ]
        }
      }
    });
    grunt.task.run([
      'ftp_push:full'
    ]);
  });
};
