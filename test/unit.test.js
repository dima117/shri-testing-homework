const { expect } = require('chai');

const {
  executeGit,
  gitFileTree,
  gitHistory,
  parseHistoryItem,
  parseFileTreeItem
} = require('../utils/git');
const {
  buildBreadcrumbs,
  buildObjectUrl
} = require('../utils/navigation');

const {
  HASH,
  BIN_HASH,
  PATH,
  fakeHistoryExec,
  fakeTreeExec,
  LOG,
  LOG_ONE_LINE,
  TREE
} = require('./stubs');

describe('Навигация', () => {
  describe('Функция buildBreadcrumbs', () => {
    it('возвращает строку "HISTORY" при вызове без аргументов', () => {
      const bc = buildBreadcrumbs();

      expect(bc).to.have.lengthOf(1);
      expect(bc[0])
        .to.have.property('text')
        .to.equal('HISTORY');
    });

    it('возвращает "крошку" на историю при вызове с хэшем', () => {
      const bc = buildBreadcrumbs(HASH, '');

      const texts = bc.map(crumb => crumb.text);
      const hrefs = bc.map(crumb => crumb.href).filter(Boolean);

      expect(bc).to.have.lengthOf(2);
      expect(texts).to.deep.equal(['HISTORY', 'ROOT']);
      expect(hrefs[0]).to.equal('/');
    });

    it('возвращает "крошки" на историю и путь', () => {
      const bc = buildBreadcrumbs(HASH, PATH);

      const texts = bc.map(crumb => crumb.text);
      const hrefs = bc.map(crumb => crumb.href).filter(Boolean);

      expect(bc).to.have.lengthOf(4);
      expect(texts).to.deep.equal(['HISTORY', 'ROOT', 'bin', 'www']);
      expect(hrefs).to.deep.equal([
        '/',
        `/files/${HASH}/`,
        `/files/${HASH}/${texts[2]}/`,
      ]);
    });
  });

  describe('Функция buildObjectUrl', () => {
    it('возвращает урл директории bin', () => {
      const url = buildObjectUrl(HASH, { path:'bin', type: 'tree' });

      expect(url).to.equal(`/files/${HASH}/bin`);
    });

    it('возвращает урл файла bin/www', () => {
      const url = buildObjectUrl(HASH, { path:'bin/www', type: 'blob' });

      expect(url).to.equal(`/content/${HASH}/bin/www`);
    });

    it('возвращает урл файла bin/www', () => {
      const url = buildObjectUrl(HASH, { path:'bin/www', type: 'foo' });

      expect(url).to.equal(`#`);
    });
  });
});

describe('Функция executeGit', () => {
  it('возвращает "www" при вызове с хэшем папки "bin"', () => {
    return executeGit('git', ['ls-tree', '--name-only', BIN_HASH])
      .then(str => {

        expect(str.trim()).to.equal('www');
      });
  });

  it('возвращает "* master" при вызове "git branch"', () => {
    return executeGit('git', ['branch'])
      .then(str => {

        expect(str.trim()).to.equal('* master');
      });
  });
});

describe('История коммитов', () => {
  it('gitHistory возвращает массив объектов с инфо о коммитах', () => {
    return gitHistory(1, 10, fakeHistoryExec)
      .then(history => {

        expect(history).to.have.lengthOf(2);
        expect(history[0]).to.deep.equal({
          hash: '112233',
          author: 'user1',
          timestamp: '2018-10-16',
          msg: 'commit message 1'
        });
      });
  });

  it('parseHistoryItem маппит строку в объект с данными', () => {
    const obj = parseHistoryItem(LOG_ONE_LINE);

    expect(obj).to.deep.equal({
      hash: '112233',
      author: 'user1',
      timestamp: '2018-10-16',
      msg: 'commit message 1'
    });
  });
});

describe('Получение инфо о tree-объекте', () => {
  it('gitFileTree возвращает массив объектов, содержащихся в tree-объекте', () => {
    return gitFileTree(HASH, PATH, fakeTreeExec)
      .then(data => {

        expect(data[0]).to.deep.equal({
          type: 'blob',
          hash: '112233',
          path: PATH
        });
      });
  });

  it('parseFileTreeItem маппит данные строки в объект', () => {
    const obj = parseFileTreeItem(TREE);

    expect(obj).to.deep.equal({
      type: 'blob',
      hash: '112233',
      path: PATH
    });
  });
});
