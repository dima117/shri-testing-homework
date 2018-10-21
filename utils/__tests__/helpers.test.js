const chai = require("chai");

const {
	getOffset,
	parseHistoryItem,
	parseFileTreeItem
} = require("../helpers");

const expect = chai.expect;

describe("Utils: Helpers", () => {
	describe("Helpers.getOffset", () => {
		it("should calculate correct offset for first page", () => {
			const page = 1;
			const size = 10;

			const resultOffest = getOffset(page, size);

			expect(resultOffest).to.eq(0);
		});

		it("should calculate correct offset for any page", () => {
			const page = 100;
			const size = 1;

			const resultOffest = getOffset(page, size);

			expect(resultOffest).to.eq(page - 1 * size);
		});
	});

	describe("Helpers.parseHistoryItem", () => {
		it("should return correct object", () => {
			const historyItemString = "hash\tauthor\ttimestamp\tmsg";

			const historyItemObject = parseHistoryItem(historyItemString);

			expect(historyItemObject).to.deep.eq({
				hash: "hash",
				author: "author",
				timestamp: "timestamp",
				msg: "msg"
			});
		});
	});

	describe("Helpers.parseFileTreeItem", () => {
		it("should return correct object", () => {
			const fileTreeItemString = "info typeBlob hash\tpath";

			const fileTreeItemObject = parseFileTreeItem(fileTreeItemString);

			expect(fileTreeItemObject).to.deep.eq({
				type: "typeBlob",
				hash: "hash",
				path: "path"
			});
		});
	});
});
