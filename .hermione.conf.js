module.exports = {
  baseUrl: 'http://0.0.0.0:3000',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',

  sets: {
    common: {
      files: 'test/test.hermione.js'
    }
  },

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
      }
    }
  },

  screenshotsDir: 'html-report/images',

  plugins: {
    'html-reporter/hermione': {
      enabled: true
    }
  }
};
