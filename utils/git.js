const { resolve } = require('path');
const REPO = resolve('.');

const { execFile } = require('child_process');

function executeGit(cmd, args) {
  // точка расширения
  const executeFile = executeGit._executeFileFake ?
    executeGit._executeFileFake:
    execFile;

  return new Promise((resolve, reject) => {
    executeFile(cmd, args, { cwd: REPO }, (err, stdout) => {
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

function gitHistory(page = 1, size = 10) {

  if (typeof gitHistory._executeFileFake === 'function') {
    executeGit._executeFileFake = gitHistory._executeFileFake;
  } else {
    delete executeGit._executeFileFake
  }

  const offset = (page - 1) * size;

  return executeGit('git', [
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

function parseFileTreeItem(line) {
  const [info, path] = line.split('\t');
  const [, type, hash] = info.split(' ');

  return { type, hash, path };
}

function gitFileTree(hash, path) {
  const params = ['ls-tree', hash];
  path && params.push(path);

  return executeGit('git', params).then(data => {
    return data
      .split('\n')
      .filter(Boolean)
      .map(parseFileTreeItem);
  });
}

function gitFileContent(hash) {

  // точка расширения
  if (typeof gitFileContent._executeFileFake === 'function') {
    executeGit._executeFileFake = gitFileContent._executeFileFake;
  } else {
    delete executeGit._executeFileFake
  }

  return executeGit('git', ['show', hash]);
}

module.exports = {
  gitHistory,
  gitFileTree,
  gitFileContent
};
