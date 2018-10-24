/* eslint-disable no-undef */
const Git = require('../../utils/git');

describe('методы класса Git', () => {
  const gitHistoryRow = 'hash12345\t' +
    'Author Name\t' +
    '2001-02-03 01:23:45 +0300\t' +
    'commit message';

  const execGitMock = jest.fn(() => {
    return new Promise((resolve) => {
      resolve(gitHistoryRow);
    });
  });

  test('Git реализует паттерн singletone', () => {
    const firstGitObj = new Git();
    const secondGitObj = new Git();
    expect(firstGitObj).toBe(secondGitObj);
  });

  test('Git.history вызывает внешнюю зависимость с нужным набором параметров', () => {
    const gitTestObject = new Git();
    gitTestObject.execute = execGitMock;

    const page = 1, size = 10;
    gitTestObject.history(page, size);

    expect(gitTestObject.execute.mock.calls.length).toBe(1);
    expect(gitTestObject.execute.mock.calls[0][0]).toBe('git');
    expect(gitTestObject.execute.mock.calls[0][1]).toEqual([
      'log',
      '--pretty=format:%H%x09%an%x09%ad%x09%s',
      '--date=iso',
      '--skip',
      page - 1,
      '-n',
      size
    ]);
  });

  test('history возвращает верный набор параметров', () => {
    const gitTestObject = new Git();
    gitTestObject.execute = execGitMock;

    const page = 1, size = 10;
    return gitTestObject.history(page, size).then(result => {
      expect(result instanceof Array).toBeTruthy(); // Ожидается массив
      expect(result.length).toBe(1); // из 1 элемента

      const arr = gitHistoryRow.split('\t');
      expect(result[0]).toEqual({
        hash: arr[0],
        author: arr[1],
        timestamp: arr[2],
        msg: arr[3]
      });
    });
  });

  test('fileContent вызывает внешнюю зависимость с корректным набором параметров', () => {
    const hash = 'hash12345';
    const execGitMock = jest.fn(() => new Promise((resolve) => {
      resolve('This is test file content!');
    }));
    const gitTestObject = new Git();
    gitTestObject.execute = execGitMock;

    return gitTestObject.fileContent(hash)
      .then(() => {
        expect(execGitMock.mock.calls.length).toBe(1);
        expect(execGitMock.mock.calls[0][0]).toBe('git');
        expect(execGitMock.mock.calls[0][1]).toEqual(['show', hash]);
      });
  });

  test('fileContent возвращает строку с содержимым файла', () => {
    const testFileContent = 'This is test file content!';
    const execGitMock = () => new Promise((resolve) => {
      resolve(testFileContent);
    });
    const gitTestObject = new Git();
    gitTestObject.execute = execGitMock;

    return gitTestObject.fileContent('hash12345')
      .then(data => {
        expect(data).toBe(testFileContent);
      });
  });

  test('fileTree вызывает внешнюю зависимость с корректными параметрами', () => {
    const execGitMock = jest.fn(() => new Promise((resolve) => {
      resolve('');
    }));
    const gitTestObject = new Git();
    gitTestObject.execute = execGitMock;

    const hash = 'hash12345';
    return gitTestObject.fileTree(hash).then(() => {
      expect(gitTestObject.execute.mock.calls.length).toBe(1);
      expect(gitTestObject.execute.mock.calls[0][0]).toEqual('git');
      expect(gitTestObject.execute.mock.calls[0][1]).toEqual(['ls-tree', hash]);
    });
  });

  test('fileTree возвращает распарсенный массив объектов директории', () => {
    const execGitMock = () => new Promise((resolve) => {
      resolve(
        '100644 blob 9036299f9ac3fa0bfdecfe83db5eb974277d8495\tpackage.json\n' +
        '040000 tree 6a033b657f10911ad9b65c27c3f9b6fb6130b058\tpublic'
      );
    });
    const gitTestObject = new Git();
    gitTestObject.execute = execGitMock;

    return gitTestObject.fileTree('hash12345', '/somePath').then(result => {
      expect(result instanceof Array).toBeTruthy();
      expect(result.length).toBe(2);
      expect(result).toContainEqual({
        type: 'blob',
        hash: '9036299f9ac3fa0bfdecfe83db5eb974277d8495',
        path: 'package.json'
      });
      expect(result).toContainEqual({
        type: 'tree',
        hash: '6a033b657f10911ad9b65c27c3f9b6fb6130b058',
        path: 'public'
      });
    });
  });

  test('fileTree корректно отрабатывает на пустой строке', () => {
    const execGitMock = jest.fn(() => new Promise((resolve) => {
      resolve('');
    }));
    const gitTestObject = new Git();
    gitTestObject.execute = execGitMock;

    return gitTestObject.fileTree('hash12345', '/somePath').then(result => {
      expect(result instanceof Array).toBeTruthy();
      expect(result.length).toBe(0);
    });
  });
});
