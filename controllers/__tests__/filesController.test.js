const sinon = require("sinon");
const chai = require("chai");

const expect = chai.expect;

const filesController = require("../filesController");
const { Git } = require("../../utils/git");

// TODO: add stubs for buildObjectUrl, buildBreadcrumbs

describe("FilesController", () => {
	const request = {};
	const response = {
		render: () => {}
	};
	let next = () => {};

	// mocks
	let gitStub;

	afterEach(() => {
		gitStub.restore();
	});

	it("should create a correct request to git for getting data for empty folder page ", async () => {
		const path = "utils";
		const hash = "hash";

		gitStub = sinon.stub(Git, "getFileTree").resolves([]);

		request.params = {
			"0": path,
			hash
		};

		await filesController(request, response, next);

		expect(gitStub.calledWith(hash, `${path}/`)).to.eq(true);
	});

	it("should create a correct request to git for getting data for page with content", async () => {
		const path = "utils";
		const hash = "hash";

		gitStub = sinon.stub(Git, "getFileTree").resolves([
			{
				path: "utils",
				type: "tree"
			}
		]);
		response.render = sinon.spy();

		request.params = {
			"0": path,
			hash
		};

		await filesController(request, response, next);

		expect(response.render.getCall(0).args).to.deep.eq([
			"files",
			{
				title: "files",
				breadcrumbs: [
					{
						text: "HISTORY",
						href: "/"
					},
					{
						href: "/files/hash/",
						text: "ROOT"
					},
					{
						text: "utils"
					}
				],
				files: [
					{
						href: "/files/hash/utils",
						name: "utils",
						path: "utils",
						type: "tree"
					}
				]
			}
		]);
	});

	it("should return correct data for page with content", async () => {
		const path = "utils";
		const hash = "hash";

		gitStub = sinon.stub(Git, "getFileTree").resolves([]);
		response.render = sinon.spy();

		request.params = {
			"0": path,
			hash
		};

		await filesController(request, response, next);

		expect(response.render.getCall(0).args).to.deep.eq([
			"files",
			{
				title: "files",
				breadcrumbs: [
					{
						text: "HISTORY",
						href: "/"
					},
					{
						href: "/files/hash/",
						text: "ROOT"
					},
					{
						text: "utils"
					}
				],
				files: []
			}
		]);
	});

	it("should call next middleware, when there is error", async () => {
		const error = new Error("test error");

		gitGetFileTreeStub = sinon.stub(Git, "getFileTree").rejects(error);

		next = sinon.spy();

		await filesController(request, response, next);

		expect(next.calledWith(error)).to.eq(true);
	});
});
