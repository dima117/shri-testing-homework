module.exports = {
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        },
        // firefox: {
        //     desiredCapabilities: {
        //         browserName: 'firefox'
        //     }
        // }
    },
    plugins: {
        'html-reporter/hermione': {
            path: 'hermione-html-report'
        }
    }
};