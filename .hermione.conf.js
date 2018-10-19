module.exports = {
    baseUrl: 'https://yandex.ru',
    gridUrl: 'http://localhost:4444/wd/hub',
    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    },
    plugins:{
        'html-reporter/hermione': {
            path: 'hermione-html-report'
        }
    }
};