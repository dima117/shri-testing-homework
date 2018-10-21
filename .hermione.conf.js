module.exports = {
  baseUrl: 'http://localhost:3000',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',

  sets: {
    desktop: {
      files: 'hermione/*.hermione.js'
    }
  },

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
    },
  },

  plugins: {
    'html-reporter/hermione': {
      path: 'hermione/hermione-html-report'
    },
    'hermione-custom-methods': {
      path: 'hermione/hermione-custom-methods'
    }
  },

  compositeImage: true
}
