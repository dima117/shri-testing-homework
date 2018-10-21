module.exports = {
  baseUrl: 'http://localhost:3000',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',
  compositeImage: true,
  browsers: {
    'chrome-desktop': {
      desiredCapabilities: {
        browserName: 'chrome',
      }
    },
    'firefox-desktop': {
      desiredCapabilities: {
        browserName: 'firefox'
      }
    }
  },
  sets: {
    desktop: {
      files: [
        './tests/integration/*.gemini.js'
      ],
      browsers: ['chrome-desktop', 'firefox-desktop']
    }
  },
  plugins: {
    'html-reporter/hermione': {
      path: 'hermione-http-report'
    }
  }
};
