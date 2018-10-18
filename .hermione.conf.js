module.exports = {
    sets: {
        desktop: {
            files: 'tests/integrationTest'
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
            path:'hermione-html-port'
        }
    }
};