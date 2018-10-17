module.exports = {
  //baseUrl: "http://localhost:3000/",
  //gridUrl: "http://0.0.0.0:4444/wd/hub/",

  sets: {
    desktop: {
      files: "tests/"
    }
  },
  plugins: {
    "html-reporter/hermione": {
      enabled: true,
      path: "hermione-html-report"
    }
  },
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: "chrome"
      }
    }
  }
};
