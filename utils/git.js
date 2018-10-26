const { resolve } = require('path');
const { execFile } = require('child_process');

const REPO = process.env.NODE_ENV === 'test' ?
  resolve('../shri_test_repo') :
  resolve('.');

class Git {
  constructor() {
    if (Git._instance) {
      return Git._instance;
    } else {
      Git._instance = this;
    }
  }

  execute(cmd, args) {
    return new Promise((resolve, reject) => {
      execFile(cmd, args, { cwd: REPO }, (err, stdout) => {
        if (err) {
          reject(err);
        }
        resolve(stdout.toString());
      });
    });
  }

  static parseHistoryItem(line) {
    const [hash, author, timestamp, msg] = line.split('\t');

    return {
      hash,
      author,
      timestamp,
      msg
    };
  }

  history(page = 1, size = 10) {
    const offset = (page - 1) * size;

    return this.execute('git', [
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
        .map(Git.parseHistoryItem);
    });
  }

  static parseFileTreeItem(line) {
    const [info, path] = line.split('\t');
    const [, type, hash] = info.split(' ');

    return { type, hash, path };
  }

  fileTree(hash, path) {
    const params = ['ls-tree', hash];
    if (path) {
      params.push(path);
    }
    return this.execute('git', params).then(data => {
      return data
        .split('\n')
        .filter(Boolean)
        .map(Git.parseFileTreeItem);
    });
  }

  fileContent(hash) {
    return this.execute('git', ['show', hash]);
  }
}
// static field of the class
Git._instance = null;


module.exports = Git;
