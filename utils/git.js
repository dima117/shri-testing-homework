const { resolve } = require('path');
const { execFile } = require('child_process');

class GitWorker {
  constructor() {
    this.REPO = resolve('.');
    this.execFile = execFile;
  }

  executeGit(args) {
    return new Promise((resolve, reject) => {
      this.execFile('git', args, { cwd: this.REPO }, (err, stdout) => {
        if (err) {
          reject(err);
        }

        resolve(stdout.toString());
      });
    });
  }

  parseHistoryItem(line) {
    const [hash, author, timestamp, msg] = line.split('\t');

    return {
      hash,
      author,
      timestamp,
      msg,
    };
  }

  gitHistory(page = 1, size = 10) {
    const offset = (page - 1) * size;

    return this.executeGit([
      'log',
      '--pretty=format:%H%x09%an%x09%ad%x09%s',
      '--date=iso',
      '--skip',
      offset,
      '-n',
      size,
    ]).then(data => data
      .split('\n')
      .filter(Boolean)
      .map(this.parseHistoryItem));
  }

  parseFileTreeItem(line) {
    const [info, path] = line.split('\t');
    const [, type, hash] = info.split(' ');

    return { type, hash, path };
  }

  gitFileTree(hash, path) {
    const params = ['ls-tree', hash];
    path && params.push(path);

    return this.executeGit(params)
      .then(data => data
        .split('\n')
        .filter(Boolean)
        .map(this.parseFileTreeItem));
  }

  gitFileContent(hash) {
    return this.executeGit(['show', hash]);
  }
}

module.exports = GitWorker;
