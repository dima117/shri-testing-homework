function parseHistoryItem(line) {
  const [hash, author, timestamp, msg] = line.split('\t');

  return {
    hash,
    author,
    timestamp,
    msg
  };
}

function gitHistory(systemConsole, page = 1, size = 10) {
  const offset = (page - 1) * size;

  return systemConsole('git', [
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

function gitFileTree(systemConsole, hash, path) {
  const params = ['ls-tree', hash];
  path && params.push(path);

  return systemConsole('git', params).then((data) => {
    return data
      .split('\n')
      .filter(Boolean)
      .map(parseFileTreeItem);
  });
}

function gitFileContent(systemConsole, hash) {
  return systemConsole('git', ['show', hash]);
}

module.exports = {
  gitHistory,
  gitFileTree,
  gitFileContent
};
