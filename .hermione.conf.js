module.export = {
  baseUrl: 'http://localhost:3000/',
  // baseUrl: 'https://yandex.ru/',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',

  sets: {
    desktop: {
      files: './hermione'
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
      path: 'hermione-html-report'
    }
  }
}
