const domain = "http://localhost:3000";

describe("check view of Content page", function() {
	it("layout shouldn't change", function() {
		return this.browser
			.url(
				`${domain}/content/c68e964f53f3ac8bc937d18c85ae6d0c600c20a9/readme.txt`
			)
			.assertView("plain", "#application");
	});
});
