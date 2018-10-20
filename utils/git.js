const { parseFileTreeItem, parseHistoryItem } = require('./helpers');
const { resolve } = require('path');
const REPO = resolve('.');

const { execFile } = require('child_process');

class GitClass {
  executeGit(cmd, args) {
    return new Promise((resolve, reject) => {
      execFile(cmd, args, { cwd: REPO }, (err, stdout) => {
        if (err) {
          reject(err);
        }

        resolve(stdout.toString());
      });
    });
  }

  gitHistory(page = 1, size = 10) {
    const offset = (page - 1) * size;

    return this.executeGit('git', [
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

    return this.executeGit('git', params).then(data => {
      return data
        .split('\n')
        .filter(Boolean)
        .map(parseFileTreeItem);
    });
  }

  gitFileContent(hash) {
    return this.executeGit('git', ['show', hash]);
  }
}

const Git = new GitClass();

module.exports = { Git, GitClass };
