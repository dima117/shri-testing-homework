module.exports = {
    sets: {
        common: {
            files: 'tests',
        },
    },
    compositeImage: true,
    plugins: {
        'html-reporter/hermione': {
            enabled: true,
            path: 'my/hermione-reports',
            defaultView: 'all'
        }
    },
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        },
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox'
            }
        }
    }
};