module.exports = {
  baseUrl: 'http://localhost:3000/',
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
      path: 'hermione-reports'
    }
  }
};
