module.exports = {
  baseUrl: 'http://localhost:3000',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',
  compositeImage: true,
  browsers: {
      chrome: {
          desiredCapabilities: {
              browserName: 'chrome'
          },
          windowSize: {
              width: 800,
              height: 1000
          }
      }
  },
    plugins: {
      'html-reporter/hermione': {
          path: './tests/integration/hermione-html-report'
      }
    },
    sets: {
      desktop: {
          files: [
              'tests/integration/*.hermione.js'
          ]
      }
    }
};