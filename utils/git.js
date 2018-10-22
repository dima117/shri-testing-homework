const { resolve } = require('path');
const REPO = (process.env.NODE_ENV === 'test') ? resolve('./test_repo') : resolve('.');

const { execFile } = require('child_process');

let currentComand = executeGit;

class gitUtilities {
  
  static get command () { return currentComand; }
  static set command (value) { currentComand = value; }

  static gitHistory (page = 1, size = 10) {
    const offset = (page - 1) * size;
  
    return this.command('git', [
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
  
  static gitFileTree(hash, path) {
    const params = ['ls-tree', hash];
    path && params.push(path);
  
    return this.command('git', params).then(data => {
      return data
        .split('\n')
        .filter(Boolean)
        .map(parseFileTreeItem);
    });
  }
  
  static gitFileContent(hash) {
    return this.command('git', ['show', hash]);
  }  

}

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

function parseFileTreeItem(line) {
  const [info, path] = line.split('\t');
  const [, type, hash] = info.split(' ');

  return { type, hash, path };
}

module.exports = gitUtilities;
