module.exports = function (grunt) {

    'use strict';

    var config = {
        css: 'css',
        less: 'less',
        javascript: 'javascript',
        test: 'test',
        vendor: 'public'
    };

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        config: config,

        connect: {
            demo: {
                options: {
                    hostname: '127.0.0.1',
                    port: 9001,
                    keepalive: true,
                    open: true,
                    base: './',
                }
            },
            dev: {
                options: {
                    hostname: '127.0.0.1',
                    port: 8080,
                    keepalive: true,
                    //livereload: 35729,
                    debug: true,
                    base: '../'
                }
            }
        },

        less: {
            core: {
                options: {
                    strictMath: true,
                    sourceMap: true,
                    outputSourceFiles: true,
                    sourceMapURL: 'app.css.map',
                    sourceMapFilename: '<%= config.css %>/app.css.map'
                },
                files: {
                    '<%= config.css %>/app.css': '<%= config.less %>/main.less',
                }
            }
        },

        csscomb: {
            options: {
                config: '<%= config.less %>/.csscomb.json'
            },
            core: {
                expand: true,
                cwd: '<%= config.css %>/',
                src: ['*.css'],
                dest: '<%= config.css %>/'
            },
        },

        jscs: {
            options: {
                config: '<%= config.javascript %>/.jscsrc'
            },
            core: {
                src: '<%= config.javascript %>/**/*.js'
            },
            test: {
                src: '<%= config.test %>/**/*.js'
            }
        },

        autoprefixer: {
            options: {
                browsers: [
                    "Android 2.3",
                    "Android >= 4",
                    "Chrome >= 20",
                    "Firefox >= 24",
                    "Explorer >= 8",
                    "iOS >= 6",
                    "Opera >= 12",
                    "Safari >= 6"
                ]
            },
            core: {
                options: {
                    map: true
                },
                src: '<%= config.css %>/app.css'
            }
        },

        cssmin: {
            options: {
                compatibility: 'ie8',
                keepSpecialComments: '*',
                sourceMap: true,
                advanced: false
            },
            core: {
                src: '<%= config.css %>/app.css',
                dest: '<%= config.css %>/app.css'
            }
        },

        csslint: {
            options: {
                csslintrc: 'less/.csslintrc'
            },
            core: '<%= config.css %>/app.css'
        },

        jshint: {
            options: {
                jshintrc: '<%= config.javascript %>/.jshintrc'
            },
            core: {
                src: '<%= config.javascript %>/**/*.js'
            },
            test: {
                src: '<%= config.test %>/<%= karma.options.frameworks[0] %>/specs/**/*.js'
            }
        },

        watch: {
            less: {
                files: ['<%= config.less %>/**/*.less'],
                tasks: ['less']
            }
        },

        // I would really like something like Philip Walton's
        // html inspector as part of the build, but I can't
        // seem to correctly configure it into the build process.

        requirejs: {
            compile: {
                options: {
                    appDir: "./",
                    baseUrl: "./<%= config.javascript %>",
                    removeCombined: true,
                    findNestedDependencies: true,
                    dir: "weather-app--ash/",
                    optimize: "uglify",
                    skipDirOptimize: true,
                    optimizeCss: 'standard',
                    fileExclusionRegExp: /^node_modules$/,
                    modules: [{
                        name: "main"
                    }],
                    mainConfigFile: '<%= config.javascript %>/require-config.js'
                }
            }
        },

        karma: {
            options: {
                basePath: process.cwd(),
                frameworks: ['mocha', 'sinon-chai'],
                reporters: ['dots', 'coverage'],
                plugins: [
                    'karma-mocha',
                    'karma-phantomjs-launcher',
                    'karma-firefox-launcher',
                    'karma-chrome-launcher',
                    'karma-sinon-chai',
                    'karma-coverage'
                ],
                preprocessors: {
                    '<%= config.javascript %>/**/*.js': ['coverage']
                },
                coverageReporter: {
                    type : 'text'
                },
                proxies: {
                  "/public/": "/base/<%= config.vendor %>/"
                },
                files: [
                    '<%= config.vendor %>/vendor/es5-shim/es5-shim.js',
                    '<%= config.vendor %>/vendor/underscore/underscore.js',
                    '<%= config.vendor %>/vendor/sinonjs/sinon.js',
                    '<%= config.vendor %>/vendor/sinon-chai/lib/sinon-chai.js',
                    '<%= config.vendor %>/vendor/requirejs/require.js',
                    '<%= config.test %>/runner.js',
                    {
                        pattern: '<%= config.javascript %>/**/*.*',
                        included: false
                    },
                    {
                        pattern: '<%= config.css %>/*',
                        included: false
                    },
                    {
                        pattern: '<%= config.vendor %>/vendor/**/*.*',
                        included: false
                    },
                    {
                        pattern: '<%= config.test %>/<%= karma.options.frameworks[0] %>/**/*',
                        included: false
                    },
                    {
                        pattern: '<%= config.test %>/assets.js',
                        included: false
                    }
                ]
            },
            test: {
                options: {
                    singleRun: true,
                    browsers: ['PhantomJS'],
                }
            },
            development: {
                options: {
                    singleRun: false,
                    browsers: ['Chrome'],
                    captureTimeout: 10000,
                }
            }
        },

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('dist-css', ['less', 'autoprefixer', 'csscomb', 'cssmin']);
    grunt.registerTask('runserver:dev', ['connect:dev']);
    grunt.registerTask('runserver', ['connect:demo']);
    grunt.registerTask('test', ['less', 'csslint', 'jscs', 'jshint', 'karma:test']);
    grunt.registerTask('dist', ['test', 'autoprefixer', 'csscomb', 'cssmin', 'requirejs']);
    grunt.registerTask('default', ['dist']);
};
