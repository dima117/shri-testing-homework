const expect = require("chai").expect;

const domain = "http://localhost:3000";

describe("check routing of application", function() {
	it("routing from list of commits to list of files should work", function() {
		const commitHash = "c68e964f53f3ac8bc937d18c85ae6d0c600c20a9";
		const expectedCommitUrl = `${domain}/files/${commitHash}/`;

		return this.browser
			.url(domain)
			.click(`#commit-${commitHash}`)
			.getUrl()
			.then(url => {
				expect(url).to.eq(expectedCommitUrl);
			});
	});

	it("routing from list of files to a folder inside should work", function() {
		const commitHash = "c68e964f53f3ac8bc937d18c85ae6d0c600c20a9";
		const folderName = "folder";

		const expectedFolderUrl = `${domain}/files/${commitHash}/${folderName}`;

		return this.browser
			.url(domain)
			.click(`#commit-${commitHash}`)
			.click(`#file-${folderName}`)
			.getUrl()
			.then(url => {
				expect(url).to.eq(expectedFolderUrl);
			});
	});

	it("routing from list of files to a file inside should work", function() {
		const commitHash = "c68e964f53f3ac8bc937d18c85ae6d0c600c20a9";
		const fileName = "testfile";

		const expectedFileUrl = `${domain}/content/${commitHash}/${fileName}`;

		return this.browser
			.url(domain)
			.click(`#commit-${commitHash}`)
			.click(`#file-${fileName}`)
			.getUrl()
			.then(url => {
				expect(url).to.eq(expectedFileUrl);
			});
	});
});
