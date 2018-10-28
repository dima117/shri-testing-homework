module.exports = {
    baseUrl: 'http://localhost:3000',
    
    sets: {
        desktop: {
            files: 'tests/int'
        }
    },

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
};