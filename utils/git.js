const { resolve } = require('path');
const REPO = resolve('.');

const { execFile } = require('child_process');

const DEV = process.env.NODE_ENV === 'development';

/* istanbul ignore next */
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

function gitHistory(page = 1, size = 10, executeGitStub) {
  const _executeGit = executeGitStub || executeGit;

  const offset = (page - 1) * size;

  return _executeGit('git', [
    'log',
    '--pretty=format:%H%x09%an%x09%ad%x09%s',
    '--date=iso',
    '--skip',
    offset,
    '-n',
    size
  ]).then(data => {
    return (DEV ? require('./gitHistoryStub') : data)
      .split('\n')
      .filter(Boolean)
      .map(parseHistoryItem)
  });
}

function parseFileTreeItem(line) {
  const [info, path] = line.split('\t');
  const [, type, hash] = info.split(' ');

  return { type, hash, path };
}

function gitFileTree(hash, path, executeGitStub) {
  const _executeGit = executeGitStub || executeGit;

  const params = ['ls-tree', hash];
  path && params.push(path);

  return _executeGit('git', params).then(data => {
    return data
      .split('\n')
      .filter(Boolean)
      .map(parseFileTreeItem);
  });
}

/* istanbul ignore next */
function gitFileContent(hash) {
  return executeGit('git', ['show', hash]);
}

module.exports = {
  gitHistory,
  gitFileTree,
  gitFileContent,
};
