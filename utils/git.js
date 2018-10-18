const { execFile } = require("child_process");
const { resolve } = require("path");

const { getOffset, parseHistoryItem, parseFileTreeItem } = require("./helpers");

class Git {
	constructor() {
		this.REPO = resolve(".");
	}

	executeGit(args) {
		return new Promise((resolve, reject) => {
			execFile("git", args, { cwd: this.REPO }, (err, stdout) => {
				if (err) {
					reject(err);
				}

				resolve(stdout.toString());
			});
		});
	}

	getHistory(page = 1, size = 10) {
		const offset = getOffset(page, size);

		return this.executeGit([
			"log",
			"--pretty=format:%H%x09%an%x09%ad%x09%s",
			"--date=iso",
			"--skip",
			offset,
			"-n",
			size
		]).then((data) => {
			return data
				.split("\n")
				.filter(Boolean)
				.map(parseHistoryItem);
		});
	}

	getFileTree(hash, path) {
		const params = ["ls-tree", hash];

		path && params.push(path);

		return this.executeGit(params).then((data) => {
			return data
				.split("\n")
				.filter(Boolean)
				.map(parseFileTreeItem);
		});
	}

	getFileContent(hash) {
		return this.executeGit(["show", hash]);
	}
}

const GitInstance = new Git();

module.exports = { Git: GitInstance, GitClass: Git };
