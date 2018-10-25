const {resolve} = require('path');
const REPO = resolve('.');

const {execFile} = require('child_process');

class Cmd {

  result(cmd, args) {
    return new Promise((resolve, reject) => {
      execFile(cmd, args, {cwd: REPO}, (err, stdout) => {
        if (err) {
          reject(err);
        }

        resolve(stdout.toString());
      });
    });
  }
}

class Git {
  constructor(cmd) {
    if (cmd) {
      this.cmd = cmd;
    } else {
      this.cmd = new Cmd();
    }
  }

  history(page = 1, size = 10) {
    const offset = (page - 1) * size;

    return this.cmd.result('git', [
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
        .map(Git.historyItem);
    });
  }

  fileTree(hash, path) {
    const params = ['ls-tree', hash];
    path && params.push(path);

    return this.cmd.result('git', params).then(data => {
      return data
        .split('\n')
        .filter(Boolean)
        .map(Git.fileTreeItem);
    });
  }

  fileContent(hash) {
    return this.cmd.result('git', ['show', hash]);
  }

  static fileTreeItem(line) {
    const [info, path] = line.split('\t');
    const [, type, hash] = info.split(' ');

    return {type, hash, path};
  }

  static historyItem(line) {
    const [hash, author, timestamp, msg] = line.split('\t');

    return {
      hash,
      author,
      timestamp,
      msg
    };
  }
}

module.exports = {Git};
