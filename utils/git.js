const { resolve } = require('path');
const REPO = resolve('.');

const { execFile } = require('child_process');

const TEST = process.env.NODE_ENV === 'test';

function executeGit(cmd, args, stub) {
  return new Promise((resolve, reject) => {
    (stub || execFile)(cmd, args, { cwd: REPO }, (err, stdout) => {
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

function gitHistory(page = 1, size = 10, stub) {
  const offset = (page - 1) * size;

  return (stub || executeGit)('git', [
    'log' + (TEST ? ' test' : ''),
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

function gitFileTree(hash, path, stub) {
  const params = ['ls-tree', hash];
  path && params.push(path);

  return (stub || executeGit)('git', params).then(data => {
    return data
      .split('\n')
      .filter(Boolean)
      .map(parseFileTreeItem);
  });
}

function gitFileContent(hash, stub) {
  return (stub || executeGit)('git', ['show', hash]);
}

module.exports = {
  executeGit,
  gitHistory,
  gitFileTree,
  gitFileContent,
};
