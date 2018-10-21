const sinon = require("sinon");
const chai = require("chai");

const expect = chai.expect;

const { GitClass } = require("../git");

class GitTestClass extends GitClass {
	constructor(mockExecuteGit) {
		super();

		this.mockExecuteGit = mockExecuteGit;
		this.data = ``;
	}

	executeGit(args) {
		return new Promise((resolve, reject) => {
			this.mockExecuteGit(args);

			resolve(this.data);
		});
	}
}

describe("Utils: Git", () => {
	let mockExecuteGit;
	let Git;

	beforeEach(() => {
		mockExecuteGit = sinon.spy();

		Git = new GitTestClass(mockExecuteGit);
	});

	describe("Git.getHistory", () => {
		const elementsOnPage = 10;

		it("should call executeGit with correct params for first page", async () => {
			await Git.getHistory(1, elementsOnPage);

			expect(
				mockExecuteGit.calledWith([
					"log",
					"--pretty=format:%H%x09%an%x09%ad%x09%s",
					"--date=iso",
					"--skip",
					0,
					"-n",
					elementsOnPage
				])
			).to.eq(true);
		});

		it("should call executeGit with correct params for third page", async () => {
			await Git.getHistory(3, elementsOnPage);

			expect(
				mockExecuteGit.calledWith([
					"log",
					"--pretty=format:%H%x09%an%x09%ad%x09%s",
					"--date=iso",
					"--skip",
					20,
					"-n",
					elementsOnPage
				])
			).to.eq(true);
		});
	});

	describe("Git.getFileTree", () => {
		it("should call executeGit with correct params, when there's only hash", async () => {
			const hash = "testHash";

			await Git.getFileTree(hash);

			expect(mockExecuteGit.calledWith(["ls-tree", hash])).to.eq(true);
		});

		it("should call executeGit with correct params, when there's hash and path", async () => {
			const hash = "testHash";
			const testPath = "testPath";

			await Git.getFileTree(hash, testPath);

			expect(mockExecuteGit.calledWith(["ls-tree", hash, testPath])).to.eq(
				true
			);
		});
	});

	describe("Git.getFileContent", () => {
		it("should call executeGit with correct params", async () => {
			const hash = "testHash";

			await Git.getFileContent(hash);

			expect(mockExecuteGit.calledWith(["show", hash])).to.eq(true);
		});
	});
});
