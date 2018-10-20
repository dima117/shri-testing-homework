module.exports = {
    baseUrl: 'http://localhost:3000',
    gridUrl: 'http://localhost:4444/wd/hub',
    screenshotsDir: 'html-reporter/images',
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
    },
    plugins: {
        'html-reporter/hermione': { 
            path: 'html-reporter'
        }
    },
    compositeImage: true
};