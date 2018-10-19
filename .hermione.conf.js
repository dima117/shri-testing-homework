module.exports = {
    baseUrl: 'http://localhost:3000',
    compositeImage: true,

    sets: {
        desktop: {
            files: 'hermione/test/desktop'
        }
    },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },

    plugins: {
        'html-reporter/hermione': {
            path: 'hermione/html-report'
        },
        'hermione-expect-location': true,
        'hermione-link-traversal': true
    }
};