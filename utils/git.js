const { resolve } = require('path');
const REPO = resolve('.');

const { execFile } = require('child_process');

function parseHistoryItem(line) {
  const [hash, author, timestamp, msg] = line.split('\t');

  return {
    hash,
    author,
    timestamp,
    msg
  };
}

function parseFileTreeItem(line) {
  const [info, path] = line.split('\t');
  const [, type, hash] = info.split(' ');

  return { type, hash, path };
}

class Git {
  constructor(repo, executeMethod) {
    this.executeMethod = executeMethod || this.execute;
    this.repo = repo || REPO;
  }

  execute(args) {
    return new Promise((resolve, reject) => {
      execFile('git', args, { cwd: this.repo }, (err, stdout) => {
        if (err) {
          console.log('rejected')
          reject(err);
        }

        resolve(stdout.toString());
      });
    });
  }

  getHistory(page = 1, size = 10) {
    const offset = (page - 1) * size;

    return this.executeMethod([
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

  getFileTree(hash, path) {
    const params = ['ls-tree', hash];
    path && params.push(path);

    return this.executeMethod(params).then(data => {
      return data
        .split('\n')
        .filter(Boolean)
        .map(parseFileTreeItem);
    });
  }

  getContent(hash) {
    return this.executeMethod(['show', hash]);
  }

}

const git = new Git();

function gitHistory(...args) {
  return git.getHistory(...args);
}

function gitFileTree(...args) {
  return git.getFileTree(...args);
}

function gitFileContent(...args) {
  return git.getContent(...args);
}

module.exports = {
  gitHistory,
  gitFileTree,
  gitFileContent,
  Git
};
