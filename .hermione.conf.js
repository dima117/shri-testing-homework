module.exports = {
  sets: {
    common: {
      files: 'tests/hermione/*.hermione.js'
    },
  },

  baseUrl: 'http://localhost:3000',

  browsers: {
    chromeWeb: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
    },
    firefoxWeb: {
      desiredCapabilities: {
        browserName: 'firefox',
      },
    },
  },

  compositeImage: true,
  screenshotsDir: 'tests/hermione/screens',

  plugins: {
    'html-reporter/hermione': {
      path: 'tests/hermione/report',
    },
  }
};