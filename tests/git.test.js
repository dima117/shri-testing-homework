const {use, expect} = require('chai');
use(require('chai-shallow-deep-equal'));

const {
  gitHistory,
  gitFileTree,
  gitFileContent,
  injectExecFileFunc
} = require('../utils/git');
const fixture = {};
fixture.log = require('../fixtures/git-log').log;
fixture.lsTree = require('../fixtures/git-ls-tree').ls;
fixture.show = require('../fixtures/git-show').show;

describe('Используем хелпер git', () => {
  describe('вызываем функцию gitHistory', () => {
    it('получаем ошибку Error: git log', async () => {
      const text = 'Error: git log';
      injectExecFileFunc((cmd, args, options, callback) => {
        callback(text, null);
      });

      let error = '';
      try {
        await gitHistory();
      } catch (e) {
        error = e
      }

      expect(error).to.equal(text);
    });

    it('получаем историю коммитов со второй позиции с лимитом два', async () => {
      injectExecFileFunc((cmd, args, options, callback) => {
        const string = fixture.log.slice(args[4] - 1, args[4] - 1 + args[6]).reduce((string, item) => {
          return string + `${item.hash}\t${item.author}\t${item.timestamp}\t${item.msg}\n`;
        }, '');
        callback(null, string);
      });

      const history = await gitHistory(2, 2);

      expect(history).to.shallowDeepEqual(fixture.log.slice(1, 3));
    });
  });

  describe('вызываем функцию gitFileTree', () => {
    it('получаем ошибку Error: git ls-tree', async () => {
      const text = 'Error: git ls-tree';
      injectExecFileFunc((cmd, args, options, callback) => {
        callback(text, null);
      });

      let error = '';
      try {
        await gitFileTree();
      } catch (e) {
        error = e
      }

      expect(error).to.equal(text);
    });

    it('получаем дерево файловой системы коммита по hash', async () => {
      const hash = 'f955adfc43b8dc46359b0cc1f1265506d80f0644';
      injectExecFileFunc((cmd, args, options, callback) => {
        const string = fixture.lsTree[args[1]].reduce((string, item) => {
          return string + `100644 ${item.type} ${item.hash}\t${item.path}\n`;
        }, '');
        callback(null, string);
      });

      const tree = await gitFileTree(hash);

      expect(tree).to.shallowDeepEqual(fixture.lsTree[hash]);
    });

    it('получаем дерево файловой системы коммита по hash и path', async () => {
      const hash = '7ca983dadaf374d2bbd001447d49c9bf34cc54fc';
      const path = 'utils/';
      injectExecFileFunc((cmd, args, options, callback) => {
        const string = fixture.lsTree[args[1]][args[2]].reduce((string, item) => {
          return string + `100644 ${item.type} ${item.hash}\t${item.path}\n`;
        }, '');
        callback(null, string);
      });

      const tree = await gitFileTree(hash, path);

      expect(tree).to.shallowDeepEqual(fixture.lsTree[hash][path]);
    });
  });

  describe('вызываем функцию gitFileContent', () => {
    it('получаем ошибку Error: git show', async () => {
      const text = 'Error: git show';
      injectExecFileFunc((cmd, args, options, callback) => {
        callback(text, null);
      });

      let error = '';
      try {
        await gitFileContent();
      } catch (e) {
        error = e
      }

      expect(error).to.equal(text);
    });
  });

  describe('вызываем функцию gitFileContent', () => {
    it('получаем изменнения содержимое файла по hash', async () => {
      const hash = 'b5809f6d2d86cbe8d75b343d8460f46b6e16a0e5';
      injectExecFileFunc((cmd, args, options, callback) => {
        callback(null, fixture.show[args[1]]);
      });

      const content = await gitFileContent(hash);

      expect(content).to.equal(fixture.show[hash]);
    });
  });
});