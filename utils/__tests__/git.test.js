const { GitClass } = require("../git");

class GitTestClass extends GitClass {
	executeGit(cmd, args) {
		console.log(cmd, args);
	}
}

describe("Utils: Git", () => {
	it("should create class", () => {
		const Git = new GitTestClass();

		Git.executeGit();
	});
});
