module.exports = {
    sets: {
        desktop: {
            files: 'tests/integrationTests'
        }
    },

    baseUrl: 'http://localhost:3000',

    compositeImage: true,

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