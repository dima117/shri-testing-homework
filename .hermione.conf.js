const path = require("path");

module.exports = {
  baseUrl: "http://localhost:3000",
  gridUrl: "http://0.0.0.0:4444/wd/hub",
  compositeImage: true,

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
  },
  plugins: {
    "html-reporter/hermione": {
      path: "hermione/hermione-html-report"
    },
    [path.resolve(__dirname, "./hermione/custom-commands.js")]: true
  }
};
