module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    frameworks: ['browserify', 'mocha', 'sinon-chai', 'sinon', 'chai'],

    plugins: [
        'karma-babel-preprocessor',
        'karma-mocha',
        'karma-phantomjs-launcher',
        'karma-firefox-launcher',
        'karma-chrome-launcher',
        'karma-sinon-chai',
        'karma-sinon',
        'karma-chai',
        //'karma-coverage',
        'karma-browserify'
    ],

    // list of files / patterns to load in the browser
    files: [
      'node_modules/mocha/mocha.js',
      'node_modules/sinon/pkg/sinon.js',
      'node_modules/chai/chai.js',
      'node_modules/jquery/dist/jquery.js',
      'node_modules/bootstrap/dist/js/bootstrap.js',
      'node_modules/babel-polyfill/dist/polyfill.js',
      'javascript/**/*.js',
      //'test/mocha/specs/**/*.spec.js'
      'test/mocha/specs/unit/**/*.spec.js'
    ],

    // list of files to exclude
    exclude: [
      '**/*.swp'
    ],

    preprocessors: {
        "javascript/**/*.js": ["browserify"],
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
    //browsers: ['Chrome', 'Firefox', 'PhantomJS', 'ChromeCanary', 'Safari', 'Opera', 'IE'],
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    //singleRun: false,
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
