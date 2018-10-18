const { execFile } = require("child_process");
const { resolve } = require("path");

function parseHistoryItem(line) {
	const [hash, author, timestamp, msg] = line.split("\t");

	return {
		hash,
		author,
		timestamp,
		msg
	};
}

function parseFileTreeItem(line) {
	const [info, path] = line.split("\t");
	const [, type, hash] = info.split(" ");

	return { type, hash, path };
}

class Git {
	constructor() {
		this.REPO = resolve(".");
	}

	executeGit(cmd, args) {
		return new Promise((resolve, reject) => {
			execFile(cmd, args, { cwd: this.REPO }, (err, stdout) => {
				if (err) {
					reject(err);
				}

				resolve(stdout.toString());
			});
		});
	}

	getHistory(page = 1, size = 10) {
		const offset = (page - 1) * size;

		return this.executeGit("git", [
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

		return this.executeGit("git", params).then((data) => {
			return data
				.split("\n")
				.filter(Boolean)
				.map(parseFileTreeItem);
		});
	}

	getFileContent(hash) {
		return this.executeGit("git", ["show", hash]);
	}
}

const GitInstance = new Git();

module.exports = { Git: GitInstance, GitClass: Git };
