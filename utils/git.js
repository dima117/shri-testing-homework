const { resolve } = require('path');
const REPO = resolve('.');

const { execFile } = require('child_process');

/**
 * тестирование исполнения команд гита без самого гита будет невозможно,
 * поэтому в рамках данного задания от его тестирования решил отказаться
 */

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

function gitHistory(page = 1, size = 10, thisExecuteGit) {
  const offset = (page - 1) * size;
  // точка расширения
  thisExecuteGit = thisExecuteGit || executeGit;

  return thisExecuteGit('git', [
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

function gitFileTree(hash, path, thisExecuteGit) {
  const params = ['ls-tree', hash];
  path && params.push(path);
  // точка расширения
  thisExecuteGit = thisExecuteGit || executeGit;

  return thisExecuteGit('git', params).then(data => {
    return data
      .split('\n')
      .filter(Boolean)
      .map(parseFileTreeItem);
  });
}

function gitFileContent(hash) {
  return executeGit('git', ['show', hash]);
}

/**
 * идея временного открытия приватных функций в глобальный scope для тестирования
 * подсмотрена у Филиппа Уолтона (Google) в этой статье:
 * https://philipwalton.com/articles/how-to-unit-test-private-functions-in-javascript/ */

const testApi = {
  parseHistoryItem,
  parseFileTreeItem
}

module.exports = {
  // тестовый код
  testApi,
  // тестовый код
  gitHistory,
  gitFileTree,
  gitFileContent
};
