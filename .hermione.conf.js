module.exports = {
    browsers: {
        // Для тестирования на MacOS -- поменять закомменченные и раскомменченные браузеры
        // safari: {
        //     desiredCapabilities: {
        //         browserName: 'safari'
        //     }
        // },
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
            path: 'hermione-html-report'
        }
    }
};