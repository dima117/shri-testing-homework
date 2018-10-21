const expect = require("chai").expect;

const domain = "http://localhost:3000";
const folderName = "folder";
const fileName = "file.txt";

describe("breadcrumbs", function() {
	it("links on the commits level in breadcrumbs should work", function() {
		return this.browser
			.url(
				`${domain}/content/c68e964f53f3ac8bc937d18c85ae6d0c600c20a9/${folderName}/${fileName}/`
			)
			.click(".breadcrumbs > a:nth-child(1)")
			.getUrl()
			.then(url => {
				expect(url).to.eq(`${domain}/`);
			});
	});

	it("links on the files level in breadcrumbs should work", function() {
		return this.browser
			.url(
				`${domain}/content/c68e964f53f3ac8bc937d18c85ae6d0c600c20a9/${folderName}/${fileName}/`
			)
			.click(".breadcrumbs > a:nth-child(2)")
			.getUrl()
			.then(url => {
				expect(url).to.eq(
					`${domain}/files/c68e964f53f3ac8bc937d18c85ae6d0c600c20a9/`
				);
			});
	});
});
