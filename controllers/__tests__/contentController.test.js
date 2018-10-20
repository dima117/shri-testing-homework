const sinon = require("sinon");
const chai = require("chai");

const expect = chai.expect;

const contentController = require("../contentController");
const { Git } = require("../../utils/git");

// TODO: add stubs for buildFolderUrl, buildBreadcrumbs
describe("ContentController", () => {
	const hash = "2d2eb09666877035c047db35fa379d636126c8d6";
	const path = "file.js";

	const request = {
		params: {
			"0": path,
			hash: hash
		}
	};
	const response = {
		render: () => {}
	};
	let next = () => {};

	let gitGetFileTreeStub;
	let gitGetFileContentStub;

	afterEach(() => {
		gitGetFileTreeStub && gitGetFileTreeStub.restore();
		gitGetFileContentStub && gitGetFileContentStub.restore();
	});

	it("should create a correct request to gitFileTree for getting files of hash", async () => {
		gitGetFileTreeStub = sinon.stub(Git, "getFileTree").resolves([]);

		await contentController(request, response, next);

		expect(gitGetFileTreeStub.calledWith(hash, path)).to.deep.eq(true);
	});

	it("should return file content, if file types is blob", async () => {
		const testFileHash = "testHashFileName.test";
		const fileTestContent = "fileContent";

		gitGetFileTreeStub = sinon.stub(Git, "getFileTree").resolves([
			{
				type: "blob",
				hash: testFileHash
			}
		]);

		response.render = sinon.spy();

		gitGetFileContent = sinon
			.stub(Git, "getFileContent")
			.resolves(`fileContent`);

		await contentController(request, response, next);

		expect(response.render.getCall(0).args).to.deep.eq([
			"content",
			{
				title: "content",
				breadcrumbs: [
					{
						href: "/",
						text: "HISTORY"
					},
					{
						href: "/files/2d2eb09666877035c047db35fa379d636126c8d6/",
						text: "ROOT"
					},
					{
						text: "file.js"
					}
				],
				content: fileTestContent
			}
		]);
	});

	it("should call next middleware, when there isn't content in file", async () => {
		const error = new Error("test error");

		gitGetFileTreeStub = sinon.stub(Git, "getFileTree").rejects(error);

		next = sinon.spy();

		await contentController(request, response, next);

		expect(next.calledWith(error)).to.eq(true);
	});
});
