module.exports = {
    baseUrl: 'http://localhost:3000',
    gridUrl: 'http://localhost:4444/wd/hub',

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
            path: 'hermione-html-report'
        }
    }
};
