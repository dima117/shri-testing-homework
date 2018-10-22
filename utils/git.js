const { resolve } = require('path');
const REPO = resolve('.');

const { execFile } = require('child_process');

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

function gitHistoryFactory(executeCommand = executeGit) {
  return function gitHistory(page = 1, size = 10) {
    const offset = (page - 1) * size;

    return executeCommand('git', [
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
  };
}

function parseFileTreeItem(line) {
  const [info, path] = line.split('\t');
  const [, type, hash] = info.split(' ');

  return { type, hash, path };
}

function gitFileTreeFactory(executeCommand = executeGit) {
  return function gitFileTree(hash, path) {
    const params = ['ls-tree', hash];
    path && params.push(path);

    return executeCommand('git', params).then(data => {
      return data
        .split('\n')
        .filter(Boolean)
        .map(parseFileTreeItem);
    });
  };
}

function gitFileContentFactory(executeCommand = executeGit) {
  return function gitFileContent(hash) {
    return executeCommand('git', ['show', hash]);
  };
}



module.exports = {
  gitHistoryFactory,
  gitFileTreeFactory,
  gitFileContentFactory
};
