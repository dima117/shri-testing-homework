module.exports = {
    sets: {
        desktop: {
            files: 'tests/Integration'
        }
    },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            },
            baseUrl: 'http://localhost:3000'
        }
    },
    plugins: {
        'html-reporter/hermione': {
            path: 'hermione-html-reporter'
        }
    }
};