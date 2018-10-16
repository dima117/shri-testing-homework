const REPO = '/Users/dima117a/shri-2/homework/multimedia-task';

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

function gitHistory(page = 1, size = 10) {
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
    return data.split('\n').filter(Boolean).map(parseHistoryItem);
  });
}

function parseFileTreeItem(line) {
    const [info, path] = line.split('\t');
    const [, type, hash] = info.split(' ');

    return { type, hash, path };
}

function gitFileTree(hash, path) {
    const pathParam = `${path.join('/')}/`;

    return executeGit('git', ['ls-tree', hash, pathParam])
        .then(data => {
            return data.split('\n').filter(Boolean).map(parseFileTreeItem);
        });
}

module.exports = {
    gitHistory,
    gitFileTree
}