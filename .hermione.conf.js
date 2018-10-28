module.exports = {
  baseUrl: 'http://localhost:3000',
  gridUrl: 'http://0.0.0.0:4444/wd/hub',

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
   },
  },

  compositeImage: true,
  plugins: {
    'html-reporter/hermione': {
      path: 'hermione-html-report',
    },
  },
};
