// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: [
            'jasmine',
            '@angular-devkit/build-angular',
        ],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma'),
            require('karma-spec-reporter'),
        ],
        client: {
            jasmine: {
                random: false,
            },
            clearContext: false,
        },
        jasmineHtmlReporter: {
            suppressAll: true // removes the duplicated traces
        },
        coverageReporter: {
            dir: require('path').join(__dirname, './coverage'),
            subdir: '.',
            reporters: [
                {type: 'html'},
                {type: 'text-summary'}
            ]
        },
        reporters: [
            'progress',
            'kjhtml',
            'spec',
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browserDisconnectTolerance: 2,
        browserNoActivityTimeout: 50000,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        restartOnFileChange: true
    });
    process.env.TZ = 'Europe/Riga'
};
