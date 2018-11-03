module.exports = {
  //baseUrl: 'https://yandex.ru',
  baseUrl: 'http://localhost:3000',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',
  compositeImage: true,

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
      path: 'hermione-html-report'
    },
    'hermione-custom-commands': true
  }
};
