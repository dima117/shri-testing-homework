module.exports = {
	sets: {
		desktop: {
			files: "__tests-int__/*.hermione.js"
		}
	},
	browsers: {
		chrome: {
			desiredCapabilities: {
				browserName: "chrome"
			}
		}
	},
	plugins: {
		"html-reporter/gemini": {
			enabled: true,
			path: "my/gemini-reports",
			defaultView: "all",
			baseHost: "test.com"
		}
	}
};
