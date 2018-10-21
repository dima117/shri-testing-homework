const { resolve } = require("path");
const REPO = resolve(".");

const { execFile } = require("child_process");

class Git {
  constructor() {
    this.exec = execFile;
    this.process = this.executeGit;
    this.parseCommit = this.parseHistoryItem;
    this.parseTree = this.parseFileTreeItem;
	}

  executeGit(cmd, args) {
    return new Promise((resolve, reject) => {
      this.exec(cmd, args, { cwd: REPO }, (err, stdout) => {
        if (err) {
          reject(err);
        }

        resolve(stdout.toString());
      });
    });
  }

  parseHistoryItem(line) {
    const [hash, author, timestamp, msg] = line.split("\t");

    return {
      hash,
      author,
      timestamp,
      msg
    };
  }

  gitHistory(page = 1, size = 10) {
    const offset = (page - 1) * size;

    return this.process("git", [
      "log",
      "--pretty=format:%H%x09%an%x09%ad%x09%s",
      "--date=iso",
      "--skip",
      offset,
      "-n",
      size
    ]).then(data => {
      return data
        .split("\n")
        .filter(Boolean)
        .map(this.parseCommit);
    });
  }

  parseFileTreeItem(line) {
    const [info, path] = line.split("\t");
    const [, type, hash] = info.split(" ");

    return { type, hash, path };
  }

  gitFileTree(hash, path) {
    const params = ["ls-tree", hash];
    path && params.push(path);

    return this.process("git", params).then(data => {
      return data
        .split("\n")
        .filter(Boolean)
        .map(this.parseTree);
    });
  }

  gitFileContent(hash) {
    return this.process("git", ["show", hash]);
  }
}
module.exports = {
  Git
};
