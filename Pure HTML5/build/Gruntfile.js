/// <reference path="typings/imports.d.ts" />
/*!
* Prototyped Grunt file for a task based javascript builder
*/
module.exports = function (grunt) {
    'use strict';

    // Load required tasks
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-browserify');

    // Define the task(s)
    grunt.registerTask('default', [
        'build',
    ]);
    grunt.registerTask('build', [
        'build-styles',
        'build-scripts',
    ]);
    grunt.registerTask('build-styles', [
        'cssmin',
    ]);
    grunt.registerTask('build-scripts', [
        'ngtemplates',
        'browserify',
    ]);

    // Configure grunt
    var config = {
        pkg: grunt.file.readJSON('package.json'),
        env: process.env,
        cfg: {
            base: '../app/',
            dest: '../dest/',
        },
        cssmin: {
            options: {
                keepSpecialComments: 0,
                shorthandCompacting: false,
                roundingPrecision: -1,
            },
            target: {
                files: [{
                    expand: true,
                    cwd: '<%= cfg.base %>assets/css',
                    src: [
                        '*.css',
                        '!*.min.css'
                    ],
                    dest: '<%= cfg.base %>assets/css',
                    ext: '.min.css'
                }]
            }

        },
        ngtemplates: {
            options: {
                module: 'myApp',
                singleModule: true,
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: false, 
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                url: function (url) {
                    // Remove the prefix (if exists)
                    var prefix = require('grunt').config('cfg').base;
                    if (prefix) {
                        if (url && (url.indexOf(prefix) == 0)) {
                            url = url.substring(prefix.length);
                            console.log(' + ' + url);
                        }
                    }
                    return url;
                },
            },
            app: {
                //cwd: '<%= cfg.base %>',
                src: '<%= cfg.base %>views/**/*.tpl.html',
                dest: '<%= cfg.base %>assets/lib/app.tpl.js'
            },
        },
        browserify: {
            js: {
                // A single entry point for our app
                src: '<%= cfg.base %>assets/lib/app.js',
                // Compile to a single file to add a script tag for in your HTML
                dest: '<%= cfg.base %>assets/lib/app.bin.js',
            },
        },
    };

    grunt.initConfig(config)
};