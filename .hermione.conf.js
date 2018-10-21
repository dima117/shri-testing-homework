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
          },
          windowSize: {
            width: 1200,
            height: 700
          }
      },

      firefox: {
          desiredCapabilities: {
              browserName: 'firefox'
          },
          windowSize: {
            width: 1200,
            height: 700
          }
      }
  },

  plugins: {
    'html-reporter/hermione': {
      path: 'hermione-html-report'
    },
    'custom-commands': true,
  },
};
