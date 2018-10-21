module.exports = {
    baseUrl: 'http://0.0.0.0:3000',
    gridUrl: 'http://0.0.0.0:4444/wd/hub',

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },

    plugins: {
        'html-reporter/hermione': {
            path: 'hermione-html-report'
        }
    },

    sets: {
        all: {
            files: 'tests/hermione/*.hermione.js'
        }
    }
};
