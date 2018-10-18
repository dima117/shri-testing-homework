const { resolve } = require('path');
const REPO = resolve('.');

const { execFile } = require('child_process');

class GitClass {
  constructor(){  }

  //возвращает результат команды
  executeGit(cmd, args) {
    return new Promise((resolve, reject) => {
      execFile(cmd, args, { cwd: REPO }, (err, stdout) => {
        if (err) {
          reject(err);
        }

        resolve(stdout.toString());
      });
    });
  }

  //строка -> объект
  parseHistoryItem(line) {
    const [hash, author, timestamp, msg] = line.split('\t');

    return {
      hash,
      author,
      timestamp,
      msg
    };
  }

  //
  // получает историю гита и преобразовывает ее в массив объектов
  gitHistory(page = 1, size = 10) {
    const offset = (page - 1) * size;

    return this.executeGit('git', [
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
        .filter(Boolean)//удаляет все ложные значения
        .map(this.parseHistoryItem);
    });
  }

  //парсер строка -> {type: 'blob', hash: 'b12e...', path: 'package.json'}
  parseFileTreeItem(line) {
    const [info, path] = line.split('\t');
    const [, type, hash] = info.split(' ');

    return { type, hash, path };
  }

  //по хэшу и пути возвращает все файлы по этому пути если файл это папка то путь равен пустой строке
  gitFileTree(hash, path) {
    const params = ['ls-tree', hash];
    path && params.push(path);

    return this.executeGit('git', params).then(data => {
      return data
        .split('\n')
        .filter(Boolean)
        .map(this.parseFileTreeItem);
    });
  }

  //строка которую возвращает гит по команде git show hash, предполагается что это содержимое файла
  gitFileContent(hash) {
    return this.executeGit('git', ['show', hash]);
  }

}

module.exports = {
  GitClass
};
