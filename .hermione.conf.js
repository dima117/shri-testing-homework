module.exports = {
  baseUrl: "http://localhost:3000/",
  screenshotsDir: "hermione-html-report/images",

  sets: {
    desktop: {
      files: "tests/integration"
    }
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
      path: "hermione-html-report",
      defaultView: "all"
    }
  },
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: "chrome"
      }
    },
    firefox: {
      desiredCapabilities: {
        browserName: "firefox"
      }
    }
  }
};
