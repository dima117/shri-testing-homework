const { resolve } = require('path');
const REPO = resolve('.');

const { execFile } = require('child_process');

let _executeCommand = executeGit;

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

module.exports = class GitCommands {
  static get executeCommand() { return _executeCommand; }
  static set executeCommand(value) { _executeCommand = value; }
  
  static gitHistory(page = 1, size = 10) {
    const offset = (page - 1) * size;

    return this.executeCommand('git', [
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

  static gitFileTree(hash, path) {
    const params = ['ls-tree', hash];
    path && params.push(path);
  
    return this.executeCommand('git', params).then(data => {
      return data
        .split('\n')
        .filter(Boolean)
        .map(parseFileTreeItem);
    });
  }
  
  static gitFileContent(hash) {
    return this.executeCommand('git', ['show', hash]);
  }
}
