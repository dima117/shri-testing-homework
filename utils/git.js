const { resolve } = require("path");
const REPO = resolve("./testRepo");

const { execFile } = require("child_process");

function executeGit(cmd, args) {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, { cwd: REPO }, (err, stdout) => {
      if (err) {
        reject(err);
      }

      resolve(stdout.toString());
    });
  });
}

function parseHistoryItem(line) {
  const [hash, author, timestamp, msg] = line.split("\t");

  return {
    hash,
    author,
    timestamp,
    msg
  };
}

class gitHistory {
  constructor() {
    this.executeGit = executeGit;
    this.run = this.run.bind(this);
  }
  run(page = 1, size = 10) {
    const offset = (page - 1) * size;
    return this.executeGit("git", [
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
        .map(parseHistoryItem);
    });
  }
}

function parseFileTreeItem(line) {
  const [info, path] = line.split("\t");
  const [, type, hash] = info.split(" ");

  return { type, hash, path };
}

class gitFileTree {
  constructor() {
    this.executeGit = executeGit;
    this.run = this.run.bind(this);
  }
  run(hash, path) {
    const params = ["ls-tree", hash];
    path && params.push(path);
    return this.executeGit("git", params).then(data => {
      return data
        .split("\n")
        .filter(Boolean)
        .map(parseFileTreeItem);
    });
  }
}

function gitFileContent(hash) {
  return executeGit("git", ["show", hash]);
}

module.exports = {
  gitHistory,
  gitFileTree,
  gitFileContent
};
