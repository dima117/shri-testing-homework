const { resolve } = require('path');
const REPO = resolve('.');

/**
 * Дочерний процесс
 */
const { execFile } = require('child_process');


class Git {

  constructor() {
    this.exec = execFile;
    this.executing = this.executeGit;
  }

  executeGit(cmd, args) {
    return new Promise((resolve, reject) => {
      this.exec(cmd, args, { cwd: REPO }, (err, stdout) => {
        if (err) {
          reject(err);
        }

        resolve(stdout.toString());
      });
    });
  }

  /**
   * Возвращает массив объектов с коммитами
   * @param page
   * @param size
   * @returns {Promise.<TResult>|*}
   */
  gitHistory(page = 1, size = 10) {
    const offset = (page - 1) * size;

    return this.executing('git', [
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
          .map(this.parseHistoryItem);
    });
  }

  /* + */
  parseHistoryItem(line) {
    const [hash, author, timestamp, msg] = line.split('\t');

    return {
      hash,
      author,
      timestamp,
      msg
    };
  }

  parseFileTreeItem(line) {
    const [info, path] = line.split('\t');
    const [, type, hash] = info.split(' ');

    return {type, hash, path};
  }

  gitFileTree(hash, path) {
    const params = ['ls-tree', hash];
    path && params.push(path);

    return this.executing('git', params).then(data => {
      return data
          .split('\n')
          .filter(Boolean)
          .map(this.parseFileTreeItem);
    });
  }

  gitFileContent(hash) {
    return this.executeGit('git', ['show', hash]);
  }
}






// function executeGit(cmd, args) {
//   return new Promise((resolve, reject) => {
//     execFile(cmd, args, { cwd: REPO }, (err, stdout) => {
//       if (err) {
//         reject(err);
//       }
//
//       resolve(stdout.toString());
//     });
//   });
// }
// function parseHistoryItem(line) {
//   const [hash, author, timestamp, msg] = line.split('\t');
//
//   return {
//     hash,
//     author,
//     timestamp,
//     msg
//   };
// }
// function gitHistory(page = 1, size = 10) {
//   const offset = (page - 1) * size;
//
//   return executeGit('git', [
//     'log',
//     '--pretty=format:%H%x09%an%x09%ad%x09%s',
//     '--date=iso',
//     '--skip',
//     offset,
//     '-n',
//     size
//   ]).then(data => {
//     return data
//       .split('\n')
//       .filter(Boolean)
//       .map(parseHistoryItem);
//   });
// }
// function parseFileTreeItem(line) {
//   const [info, path] = line.split('\t');
//   const [, type, hash] = info.split(' ');
//
//   return { type, hash, path };
// }
// function gitFileTree(hash, path) {
//   const params = ['ls-tree', hash];
//   path && params.push(path);
//
//   return executeGit('git', params).then(data => {
//     return data
//       .split('\n')
//       .filter(Boolean)
//       .map(parseFileTreeItem);
//   });
// }
// function gitFileContent(hash) {
//   return executeGit('git', ['show', hash]);
// }

module.exports = {
  Git
};
