const { getOffset, parseFileTreeItem, parseHistoryItem } = require('./helpers');
const { resolve } = require('path');
const REPO = resolve('.');

const { execFile } = require('child_process');

class GitClass {
  getExecFile(args) {
    return new Promise((resolve, reject) => {
      execFile('git', args, { cwd: REPO }, (err, stdout) => {
        if (err) {
          reject(err);
        }

        resolve(stdout.toString());
      });
    });
  }

  executeGit(args) {
    return this.getExecFile(args);
  }

  gitHistory(page = 1, size = 10) {
    const offset = getOffset(page, size);

    return this.executeGit([
      'log',
      '--pretty=format:%H%x09%an%x09%ad%x09%s',
      '--date=iso',
      '--skip',
      offset,
      '-n',
      size
    ]).then(data => {
      return data
        .split('\n')
        .filter(Boolean)
        .map(parseHistoryItem);
    });
  }

  gitFileTree(hash, path) {
    const params = ['ls-tree', hash];
    path && params.push(path);

    return this.executeGit(params).then(data => {
      return data
        .split('\n')
        .filter(Boolean)
        .map(parseFileTreeItem);
    });
  }

  gitFileContent(hash) {
    return this.executeGit(['show', hash]);
  }
}

const Git = new GitClass();

module.exports = { Git, GitClass };
