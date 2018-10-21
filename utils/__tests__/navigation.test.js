const chai = require("chai");

const {
	buildFolderUrl,
	buildFileUrl,
	buildBreadcrumbs
} = require("../navigation");

const expect = chai.expect;

describe("Utils: Navigation", () => {
	describe("Navigation.buildFolderUrl", () => {
		it("should create url to folder", () => {
			const parentHash = "testHash";

			const urlToFolder = buildFolderUrl(parentHash);

			expect(urlToFolder).to.eq(`/files/${parentHash}/`);
		});
	});

	describe("Navigation.buildFileUrl", () => {
		it("should create url to folder", () => {
			const parentHash = "testHash";
			const pathToFile = "file/file.jpg";

			const urlToFile = buildFileUrl(parentHash, pathToFile);

			expect(urlToFile).to.eq(`/content/${parentHash}/${pathToFile}`);
		});
	});

	describe("Navigation.buildBreadcrumbs", () => {
		it("should create breadcrumbs for a first-level element without link, when there's no arguments", () => {
			const breadcrumbs = buildBreadcrumbs();

			expect(breadcrumbs).to.deep.eq([
				{
					text: "HISTORY",
					href: undefined
				}
			]);
		});

		it("should create breadcrumbs for a second-level element, when there's a hash", () => {
			const hash = "hashHash";
			const breadcrumbs = buildBreadcrumbs(hash);

			expect(breadcrumbs).to.deep.eq([
				{
					text: "HISTORY",
					href: "/"
				},
				{
					text: "ROOT",
					href: undefined
				}
			]);
		});

		it("should create breadcrumbs for any deep level of links, when there's a hash and path", () => {
			const hash = "hashHash";
			const path = "/controllers/new/file.jpg";

			const breadcrumbs = buildBreadcrumbs(hash, path);

			expect(breadcrumbs).to.deep.eq([
				{
					text: "HISTORY",
					href: "/"
				},
				{
					text: "ROOT",
					href: `/files/${hash}/`
				},
				{
					text: `controllers`,
					href: `/files/${hash}/controllers/`
				},
				{
					text: `new`,
					href: `/files/${hash}/controllers/new/`
				},
				{
					text: `file.jpg`
				}
			]);
		});
	});
});
