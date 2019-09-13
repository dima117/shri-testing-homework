const { resolve } = require('path');
const REPO = resolve('.');

const execFile = require('util').promisify(require('child_process').execFile);

module.exports = {
  parseExecuteGit(data, fn) {
    return data
      .split('\n')
      .filter(Boolean)
      .map(fn);
  },

  executeGit(args) {
    return execFile('git', args, { cwd: REPO })
      .then(result => result.stdout.toString());
  },

  parseHistoryItem(line) {
    const [hash, author, timestamp, msg] = line.split('\t');

    return {
      hash,
      author,
      timestamp,
      msg
    };
  },

  gitHistory(page = 1, size = 10) {
    const offset = (page - 1) * size;

    return this.executeGit([
      'log',
      '--pretty=format:%H%x09%an%x09%ad%x09%s',
      '--date=iso',
      '--skip',
      offset,
      '-n',
      size
    ]).then(data => this.parseExecuteGit(data, this.parseHistoryItem));
  },

  parseFileTreeItem(line) {
    const [info, path] = line.split('\t');
    const [, type, hash] = info.split(' ');

    return { type, hash, path };
  },

  gitFileTree(hash, path) {
    const params = ['ls-tree', hash];
    path && params.push(path);

    return this.executeGit(params).then(data => this.parseExecuteGit(data, this.parseFileTreeItem));
  },

  gitFileContent(hash) {
    return this.executeGit(['show', hash]);
  }
};
