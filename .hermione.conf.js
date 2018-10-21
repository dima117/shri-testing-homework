module.exports = {
    baseUrl: 'https://yandex.ru',
    gridUrl: 'https://0.0.0.0:4444/wd/hub',

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
}