const cliInterface = require('./cli-interface');

const gitTools = {
  cliInterface
};

function executeGit(args) {
  return gitTools.cliInterface('git', args);
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

function parseGitHistoryList(text) {
  return text
      .split('\n')
      .filter(Boolean)
      .map(parseHistoryItem);
}

function gitHistory(page = 1, pageSize = 10) {
  const offset = (page - 1) * pageSize;

  return executeGit([
    'log',
    '--pretty=format:%H%x09%an%x09%ad%x09%s',
    '--date=iso',
    '--skip',
    offset,
    '-n',
    pageSize
  ]).then(parseGitHistoryList);
}

function parseFileTreeItem(line) {
  const [info, path] = line.split('\t');
  const [, type, hash] = info.split(' ');
  return { type, hash, path };
}

function parseGitFileTree(text) {
  return text
      .split('\n')
      .filter(Boolean)
      .map(parseFileTreeItem);
}

function gitFileTree(commitHash, path) {
  const params = [
    'ls-tree',
    commitHash
  ];

  if (path) {
    params.push(path);
  }

  return executeGit(params)
      .then(parseGitFileTree);
}

function gitFileContent(fileOrFolderHash) {
  return executeGit(['show', fileOrFolderHash]);
}

module.exports = Object.assign(gitTools, {
  gitFileContent,
  gitFileTree,
  gitHistory
});
