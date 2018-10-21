module.exports = {
  baseUrl: 'http://localhost:3000/',
  // gridUrl: 'http://0.0.0.0:4444/wb/hub',
  compositeImage: true,
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
      path: 'hermione-html-reporter',
    },
    'hermione-custom-commands': true,
  },
};
