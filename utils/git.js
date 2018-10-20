const { resolve } = require('path');
const REPO = resolve('.');

const { execFile } = require('child_process');

function executeGit(args, postprocess) {
  return new Promise((resolve, reject) => {
    execFile('git', args, { cwd: REPO }, (err, stdout) => {
      if (err) {
        reject(err);
      }

      if (postprocess)
        resolve(postprocess(stdout.toString()));
      else
        resolve(stdout.toString());
    });
  });
}

function parseMultiline(lineParser) {
  return (rawInput) => rawInput
    .split('\n')
    .filter(Boolean)
    .map(lineParser);
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

function gitHistory({ page = 1, size = 10, gitRunner = executeGit }) {
  const offset = (page - 1) * size;
  const params = [
    'log',
    '--pretty=format:%H%x09%an%x09%ad%x09%s',
    '--date=iso',
    '--skip',
    offset,
    '-n',
    size
  ];

  return gitRunner(params, parseMultiline(parseHistoryItem));
}

function parseFileTreeItem(line) {
  const [info, path] = line.split('\t');
  const [, type, hash] = info.split(' ');

  return { type, hash, path };
}

function gitFileTree({ hash, path, gitRunner = executeGit }) {
  const params = ['ls-tree', hash];
  path && params.push(path);

  return gitRunner(params, parseMultiline(parseFileTreeItem));
}

function gitFileContent({ hash, gitRunner = executeGit }) {
  return gitRunner(['show', hash]);
}

module.exports = {
  gitHistory,
  gitFileTree,
  gitFileContent
};
