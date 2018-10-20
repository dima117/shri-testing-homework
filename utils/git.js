const { resolve } = require('path');

const REPO = resolve('.');

const { execFile } = require('child_process');


function executeGit(cmd, args) {
  // точка расширения

  if (typeof executeGit._executeFileFake === 'function') {
    return executeGit._executeFileFake(cmd, args);
  }

  return new Promise((resolve, reject) => {
    execFile(cmd, args, { cwd: REPO }, (err, stdout) => {
      if (err) {
        reject(err);
      }

      resolve(stdout.toString());
    });
  });
}

// Функция помощник устанавливающая точки расширения
function _setExecuteFileFake(fakeFunction) {
  if (typeof fakeFunction === 'function') {
    executeGit._executeFileFake = fakeFunction;
  } else {
    delete executeGit._executeFileFake;
  }
}

function parseHistoryItem(line) {
  const [hash, author, timestamp, msg] = line.split('\t');

  return {
    hash,
    author,
    timestamp,
    msg,
  };
}

function gitHistory(page = 1, size = 10) {
  _setExecuteFileFake(gitHistory._executeFileFake);

  const offset = (page - 1) * size;

  return executeGit('git', [
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
    .map(parseHistoryItem));
}

function parseFileTreeItem(line) {
  const [info, path] = line.split('\t');
  const [, type, hash] = info.split(' ');

  return { type, hash, path };
}

function gitFileTree(hash, path) {
  _setExecuteFileFake(gitFileTree._executeFileFake);

  const params = ['ls-tree', hash];
  path && params.push(path);

  return executeGit('git', params).then(data => data
    .split('\n')
    .filter(Boolean)
    .map(parseFileTreeItem));
}

function gitFileContent(hash) {
  // точка расширения
  _setExecuteFileFake(gitFileContent._executeFileFake);

  return executeGit('git', ['show', hash]);
}

module.exports = {
  gitHistory,
  gitFileTree,
  gitFileContent,
};
