const domain = "http://localhost:3000";

describe("check view of Index page", function() {
	it("layout shouldn't change", function() {
		return this.browser.url(domain).assertView("plain", "#application");
	});
});
