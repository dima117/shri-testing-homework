const { resolve } = require('path');
const REPO = resolve('.');

const { execFile } = require('child_process');

//возвращает результат команды
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

//строка -> объект
function parseHistoryItem(line) {
  const [hash, author, timestamp, msg] = line.split('\t');

  return {
    hash,
    author,
    timestamp,
    msg
  };
}

// получает историю гита и преобразовывает ее в массив объектов
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
    return data
      .split('\n')
      .filter(Boolean)//удаляет все ложные значения
      .map(parseHistoryItem);
  });
}

//парсер строка -> {type: 'blob', hash: 'b12e...', path: 'package.json'}
function parseFileTreeItem(line) {
  const [info, path] = line.split('\t');
  const [, type, hash] = info.split(' ');

  return { type, hash, path };
}

//по хэшу и пути возвращает все файлы по этому пути если файл это папка то путь равен пустой строке
function gitFileTree(hash, path) {
  const params = ['ls-tree', hash];
  path && params.push(path);

  return executeGit('git', params).then(data => {
    return data
      .split('\n')
      .filter(Boolean)
      .map(parseFileTreeItem);
  });
}

//строка которую возвращает гит по команде git show hash, предполагается что это содержимое файла
function gitFileContent(hash) {
  return executeGit('git', ['show', hash]);
}

module.exports = {
  gitHistory,
  gitFileTree,
  gitFileContent
};
