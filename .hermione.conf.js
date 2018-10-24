module.exports = {
  baseUrl: 'http://localhost:3000',
  gridUrl: 'http://localhost:4444/wd/hub',

  sets: {
    desktop: {
      files: 'hermione'
    }
  },

  browsers: {
      chrome: {
        desiredCapabilities: {
          browserName: 'chrome'
        }
      }
  }
};
