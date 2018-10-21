const path = require('path');

module.exports = {
  baseUrl: 'http://localhost:3000',
  gridUrl: 'http://localhost:4444/wd/hub',
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  },
  plugins: {
    'html-reporter/hermione': {
      path: 'hermione-html-report'
    },
    [path.resolve(__dirname) + '/hermione-customs/index.js']: true
  }
}
