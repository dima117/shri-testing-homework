module.exports = {
    baseUrl: 'http://localhost:3000',
    gridUrl: 'http://0.0.0.0:4444/wd/hub',
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },
    sets: {
        desktop: {
            files: 'tests/test.hermione.js'
        }
    },
    plugins: {
        'html-reporter/hermione': {
            path: 'hermione-html-report'
        }
    }
};