const { expect } = require('chai');

const { gitFileTree, gitHistory, executeGit } = require('../utils/git');
const { buildBreadcrumbs } = require('../utils/navigation');

const {
  HASH,
  BIN_HASH,
  PATH,
  fakeHistoryExec,
  fakeTreeExec
} = require('./stubs');

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

describe('Функция executeGit', () => {
  it('возвращает вывод git команд в виде строки', () => {
    return executeGit('git', ['ls-tree', '--name-only', BIN_HASH])
      .then(str => {

        expect(str.trim()).to.deep.equal('www');
      });
  });
});

describe('Функция gitHistory', () => {
  it('возвращает массив объектов с инфо о коммитах', () => {
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
});

describe('Функция gitFileTree', () => {
  it('возвращает массив объектов, содержащихся в git-дереве', () => {
    return gitFileTree(HASH, PATH, fakeTreeExec)
      .then(data => {

        expect(data[0]).to.deep.equal({
          type: 'blob',
          hash: '112233',
          path: PATH
        });
      });
  });
});
