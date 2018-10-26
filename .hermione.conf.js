module.exports = {
  baseUrl: 'http://localhost:3000/',
  gridUrl: 'http://localhost:4444/wd/hub',
  compositeImage: true,
  // system: {
  //   debug: true
  // },
  sets: {
    desktop: {
      files: 'tests/hermione/*.hermione.js'
    }
  },
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    },
    // Не получилось запустить тесты на firefox из-за возникших инфраструктурных проблем.
    // firefox: {
    //   desiredCapabilities: {
    //     browserName: 'firefox'
    //   }
    // }
  },
  plugins: {
    'html-reporter/hermione': {
      path: 'hermione_reports'
    }
  }
};
