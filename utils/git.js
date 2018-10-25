const { resolve } = require('path');
const { execFile } = require('child_process');
const { parseFileTreeItem, parseHistoryItem, normalizeData } = require('./helpers');

const REPO = resolve('.');

  function executeGit(cmd, args) {
  return new Promise((resolve, reject) => {
    execFile(cmd, args, { cwd: REPO }, (err, stdout) => {
      if (err) reject(err);
      resolve(stdout.toString());
    });
  });
}

function gitHistory({ page = 1, size = 10 }, path, execute = executeGit) {
  const params = ['log', '--pretty=format:%H%x09%an%x09%ad%x09%s', '--date=iso', '--skip', (page - 1) * size, '-n', size ];
  path && params.push(path);

  return execute('git', params).then(normalizeData(parseHistoryItem));
}

function gitFileTree(hash, path, execute = executeGit) {
  const params = ['ls-tree', hash];
  path && params.push(path);

  return execute('git', params).then(normalizeData(parseFileTreeItem));
}


function gitFileContent(hash, execute = executeGit) {
  const params = ['show', hash];

  return execute('git', params);
}

module.exports = {
  gitHistory,
  gitFileTree,
  gitFileContent
};
