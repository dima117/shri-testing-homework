const { expect, assert } = require('chai');
const sinon = require('sinon');
const { gitFileContent, gitFileTree, gitHistory } = require('../../../utils/git');

describe('работа с Git', () => {
  describe('gitFileContent: получение контента коммита', () => {
    it('вызывает корректную git команду для получения контента', async () => {
      const mock = sinon.fake();

      gitFileContent._executeFileFake = mock;

      await gitFileContent('90180910fc27a11272a3e5caeeb119a51e5c0545');

      assert(mock.calledWith('git', [
        'show',
        '90180910fc27a11272a3e5caeeb119a51e5c0545',
      ]), 'git вызван с некорректными параметрами');
    });
  });


  describe('gitHistory: получение истории коммитов', () => {
    it('вызывает корректную git команду для получения истории коммитов', async () => {
      const mock = await sinon.fake.resolves('');
      gitHistory._executeFileFake = mock;

      await gitHistory(1, 5);

      assert(mock.calledWith('git', [
        'log',
        '--pretty=format:%H%x09%an%x09%ad%x09%s',
        '--date=iso',
        '--skip',
        0,
        '-n',
        5,
      ]), 'функция git вызвана с некорректными параметрами');
    });

    it('данные получаем нужном формате', async () => {
      const stub = 'cd8de07994ac47fddad63ca0d3e38d71a99da9ef\tAlexander Ivankov\t'
      + '2018-10-19 03:54:15 +0300\tTesting [homework]: написал hermione тесты на страницу с файловой структурой\n'
      + '1ac31291b9ca4903fb970c8c73057118ff4e79c9\tAlexander Ivankov\t'
      + '2018-10-19 02:35:12 +0300\tTesting [homework]: написал hermione тесты на главную страницу';

      gitHistory._executeFileFake = () => new Promise((res, rej) => {
        res(stub);
      });

      const history = await gitHistory(1, 5);

      expect(history).to.have.deep.members([
        {
          author: 'Alexander Ivankov',
          hash: 'cd8de07994ac47fddad63ca0d3e38d71a99da9ef',
          msg: 'Testing [homework]: написал hermione тесты на страницу с файловой структурой',
          timestamp: '2018-10-19 03:54:15 +0300',
        },
        {
          author: 'Alexander Ivankov',
          hash: '1ac31291b9ca4903fb970c8c73057118ff4e79c9',
          msg: 'Testing [homework]: написал hermione тесты на главную страницу',
          timestamp: '2018-10-19 02:35:12 +0300',
        },
      ]);
    });
  });


  describe('gitFileTree: получение файлового дерева', () => {
    it('функция вызывается с корректными параметрами без передачи пути', () => {
      const mock = sinon.fake.resolves('');
      gitFileTree._executeFileFake = mock;

      gitFileTree('0a88cdf2265c0b19663ddbe2733a27e9599724e1');

      assert(mock.calledWith('git', [
        'ls-tree',
        '0a88cdf2265c0b19663ddbe2733a27e9599724e1',
      ]), 'git вызван с некорректными параметрами');
    });

    it('функция вызывается с корректными параметрами c передачи пути', () => {
      const mock = sinon.fake.resolves('');
      gitFileTree._executeFileFake = mock;

      gitFileTree('0a88cdf2265c0b19663ddbe2733a27e9599724e1', 'controllers/');

      assert(mock.calledWith('git', [
        'ls-tree',
        '0a88cdf2265c0b19663ddbe2733a27e9599724e1',
        'controllers/',
      ]), 'git вызван с некорректными параметрами');
    });

    it('данные получаем нужном формате', async () => {
      const stub = '100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8\t.gitignore\n040000 tree 6a033b657f10911ad9b65c27c3f9b6fb6130b058\tpublic\n040000 file 0c174efd10167e419bca53f98fde0611072258ba\tutils.js';
      gitFileTree._executeFileFake = () => new Promise((resolve, reject) => {
        resolve(stub);
      });

      const result = await gitFileTree('0a88cdf2265c0b19663ddbe2733a27e9599724e1');

      expect(result).to.have.deep.members([
        {
          type: 'blob',
          hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
          path: '.gitignore',
        },
        {
          type: 'tree',
          hash: '6a033b657f10911ad9b65c27c3f9b6fb6130b058',
          path: 'public',
        },
        {
          type: 'file',
          hash: '0c174efd10167e419bca53f98fde0611072258ba',
          path: 'utils.js',
        },
      ]);
    });
  });
});
