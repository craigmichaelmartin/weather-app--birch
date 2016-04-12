module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    frameworks: ['browserify', 'mocha', 'sinon-chai', 'sinon', 'chai'],

    plugins: [
        'karma-babel-preprocessor',
        'karma-mocha',
        'karma-phantomjs2-launcher',
        'karma-firefox-launcher',
        'karma-chrome-launcher',
        'karma-safari-launcher',
        'karma-sinon-chai',
        'karma-sinon',
        'karma-chai',
        //'karma-coverage',
        'karma-browserify'
    ],

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
        'test/mocha/specs/**/*.spec.js',
        {
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
            ['babelify', {"presets": ["es2015"]}],
            'brfs'
        ]
    },

    //coverageReporter: {
    //    type : 'text'
    //},

    //reporters: ['dots', 'coverage'],

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


    // start these browsers
    browsers: ['PhantomJS2', 'PhantomJS2_custom'],

    customLaunchers: {
      'PhantomJS2_custom': {
        base: 'PhantomJS2',
        options: {
          windowName: 'my-window',
          settings: {
            webSecurityEnabled: false
          },
        },
        flags: ['--load-images=true'],
        debug: true
      }
    },

    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    //singleRun: false,
    singleRun: true,

    browserDisconnectTimeout: 100000,
    browserNoActivityTimeout: 100000,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
