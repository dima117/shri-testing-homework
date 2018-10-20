const assert = require("chai").assert;

describe("check routing of application", function() {
	it("routing from list of commits to list of files should work", function() {
		return this.browser.url("http://localhost:3000/").then(function(title) {
			console.log(title);
		});
	});
});
