const sinon = require("sinon");
const chai = require("chai");

const expect = chai.expect;

const indexController = require("../indexController");
const { Git } = require("../../utils/git");

// TODO: add stubs for buildFolderUrl, buildBreadcrumbs
describe("IndexController", () => {
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

	it("should create a correct request to git for getting first page", async () => {
		gitStub = sinon.stub(Git, "getHistory").resolves([]);

		await indexController(request, response, next);

		expect(gitStub.calledWith(1, 20)).to.eq(true);
	});

	it("should return correct data for empty page", async () => {
		gitStub = sinon.stub(Git, "getHistory").resolves([]);

		response.render = sinon.spy();

		await indexController(request, response, next);

		expect(
			response.render.calledWith("index", {
				title: "history",
				breadcrumbs: [
					{
						text: "HISTORY",
						href: undefined
					}
				],
				list: []
			})
		).to.eq(true);
	});

	it("should return correct data for page with content", async () => {
		gitStub = sinon.stub(Git, "getHistory").resolves([{ hash: "testHash" }]);
		response.render = sinon.spy();

		await indexController(request, response, next);

		expect(response.render.getCall(0).args).to.deep.eq([
			"index",
			{
				title: "history",
				breadcrumbs: [
					{
						text: "HISTORY",
						href: undefined
					}
				],
				list: [
					{
						hash: "testHash",
						href: "/files/testHash/"
					}
				]
			}
		]);
	});

	it("should call next middleware, when there is error", async () => {
		const error = { error: "problem" };

		gitStub = sinon.stub(Git, "getHistory").rejects(error);
		next = sinon.spy();

		await indexController(request, response, next);

		expect(next.calledWith(error)).to.eq(true);
	});
});
