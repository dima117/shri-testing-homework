module.exports = {
  baseUrl: 'http://localhost:3000',
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  },
  plugins: {
    'html-reporter/hermione': {
      path: 'hermione-html-report',
      enabled: true
    }
  },
  screenshotsDir: 'hermione-html-report/images',
  compositeImage: true
}