var _ = require('underscore');

// Browsers to run on Sauce Labs platforms
var sauceBrowsers = _.reduce([
    ['firefox', 'latest', 'Windows 10'],
    ['firefox', 'latest', 'Windows 8'],
    ['firefox', 'latest', 'Windows 7'],
    ['firefox', 'latest', 'Windows XP'],
    ['firefox', 'latest', 'OS X 10.11'],
    ['firefox', 'latest', 'OS X 10.10'],
    ['firefox', 'latest', 'OS X 10.9'],
    ['firefox', 'latest', 'OS X 10.8'],
    ['firefox', 'latest', 'Linux'],

    ['chrome', 'latest', 'Windows 10'],
    ['chrome', 'latest', 'Windows 8'],
    ['chrome', 'latest', 'Windows 7'],
    ['chrome', 'latest', 'Windows XP'],
    ['chrome', 'latest', 'OS X 10.11'],
    ['chrome', 'latest', 'OS X 10.10'],
    ['chrome', 'latest', 'OS X 10.9'],
    ['chrome', 'latest', 'OS X 10.8'],
    ['chrome', 'latest', 'Linux'],

    ['microsoftedge', 'latest', 'Windows 10'],

    ['internet explorer', '11', 'Windows 10'],
    ['internet explorer', '11', 'Windows 8.1'],
    ['internet explorer', '11', 'Windows 7'],

    ['opera', 'latest', 'Windows 7'],
    ['opera', 'latest', 'Windows XP'],
    ['opera', 'latest', 'Linux'],

    ['android', '5.1'],
    ['android', '5'],
    ['android', '4.4'],

    ['safari', 'latest', 'OS X 10.11'],
    ['safari', 'latest', 'OS X 10.10'],
    ['safari', 'latest', 'OS X 10.9'],
    ['safari', 'latest', 'OS X 10.8']

], function (memo, platform) {
    // internet explorer -> ie
    var label = platform[0].split(' ');
    if (label.length > 1) {
        label = _.invoke(label, 'charAt', 0)
    }
    label = (label.join("") + '_v' + platform[1]).replace(' ', '_').toUpperCase();
    memo[label] = _.pick({
        'base': 'SauceLabs',
        'browserName': platform[0],
        'version': platform[1],
        'platform': platform[2]
    }, Boolean);
    return memo;
}, {});

module.exports = function (config) {
    if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
        console.log('Sauce environments not set --- Skipping');
        return process.exit(0);
    }

    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        frameworks: ['browserify', 'mocha', 'sinon-chai', 'sinon', 'chai'],
        //
        // plugins: [
        //     'karma-babel-preprocessor',
        //     'karma-mocha',
        //     'karma-phantomjs2-launcher',
        //     'karma-firefox-launcher',
        //     'karma-chrome-launcher',
        //     'karma-safari-launcher',
        //     'karma-sauce-launcher',
        //     'karma-sinon-chai',
        //     'karma-sinon',
        //     'karma-chai',
        //     //'karma-coverage',
        //     'karma-browserify'
        // ],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/underscore/underscore.js',
            'node_modules/es5-shim/es5-shim.js',
            'node_modules/bootstrap/dist/js/umd/util.js',
            'node_modules/bootstrap/dist/js/umd/alert.js',
            'node_modules/bootstrap/dist/js/umd/button.js',
            'node_modules/d3/d3.js',
            'test/mocha/assets.js',
            'css/app.min.css',
            'javascript/main.js',
            'test/mocha/helpers.js',
            'node_modules/mocha/mocha.js',
            'node_modules/sinon/pkg/sinon.js',
            'node_modules/chai/chai.js',
            'test/mocha/specs/**/*.spec.js', {
                pattern: 'node_modules/font-awesome/fonts/*',
                included: false
            }
        ],

        // list of files to exclude
        exclude: [
            '**/*.swp'
        ],

        preprocessors: {
            "javascript/main.js": ["browserify"],
            "test/mocha/helpers.js": ["browserify"],
            "test/mocha/assets.js": ["browserify"],
            "test/mocha/specs/**/*.spec.js": ["browserify"]
        },

        browserify: {
            transform: [
                ['babelify', {
                    "presets": ["es2015"]
                }],
                'brfs'
            ]
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        //autoWatch: true,
        autoWatch: false,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        captureTimeout: 600001,
        browserDisconnectTimeout: 200001,
        browserDisconnectTolerance: 0,
        browserNoActivityTimeout: 100001,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: 4,

        sauceLabs: {
            build: 'TRAVIS #' + process.env.TRAVIS_BUILD_NUMBER + ' (' + process.env.TRAVIS_BUILD_ID + ')',
            startConnect: false,
            tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
        },

        customLaunchers: sauceBrowsers,
        browsers: _.keys(sauceBrowsers)
    })
}
