module.exports = {
    sets: {
        desktop: {
            files: 'tests/integrationTests'
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