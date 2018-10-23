module.exports = {
    sets: {
        desktop: {
            files: "hermione/*.hermione.js"
        }
    },
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
            path: 'hermione-html-report',
        },
        'hermione-custom-commands': {

        }
    },
    baseUrl: 'http://localhost:3000',
    gridUrl: 'http://localhost:4444/wd/hub',
};