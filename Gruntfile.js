/*jslint
    white */
/* global
  grunt */
module.exports = function (grunt) {
  'use script';

  // Configs
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    hosts: grunt.file.readJSON('hosts.json'),
    ftp_push: {
      sampleftpTest: {
        options: {
          authKey: "demos1",
          host: '<%= hosts.live.remoteurl %>',
          dest: '<%= hosts.live.remotedir %>',
          port: 21,
          debug: false
        },
        files: [
          {expand: true,cwd: 'build',src: ['**/*']}
        ]
      }
    },
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
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [
          {
            cwd: "src",
            src: ["**/*.jade", "!templates/**/*.jade"],
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

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-ftp-push');
  grunt.loadNpmTasks('grunt-contrib-jade');

  // Registered Tasks
  grunt.registerTask('build',
    [
      'clean:build',
      'sass:build',
      'copy:build',
      'jade:compile'
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
  grunt.registerTask('ftp',
    [
      'ftp_push'
    ]);
};
