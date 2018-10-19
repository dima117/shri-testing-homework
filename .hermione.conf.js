module.exports = {
    baseUrl: 'http://localhost:3000/',
    gridUrl: 'http://0.0.0.0:4444/wd/hub',

    browsers: {
        firefox: {
            desiredCapabilities: {
                browserName: 'firefox'
            }
        },
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
}
