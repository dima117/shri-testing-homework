module.exports = {
  baseUrl: 'http://0.0.0.0:3000',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',

  sets: {
      desktop: {
          files: 'tests/integration'
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
      }
  },

  plugins: {
    'html-reporter/hermione': {
      path: 'hermione-html-report'
    },
    'custom-commands': true,
  },
  windowSize: {
    width: 800,
    height: 1000
  }
};