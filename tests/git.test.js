const {Git} = require('../utils/git');
const assert = require('chai').assert;

describe('Тест хелпера Git', () => {

  it('Получаем историю коммитов в виде объектов', async function () {
    const git = new Git();

    git.executing = () => {
      return Promise.resolve('hash1\tauthor1\tdate1\ttext1\n' + 'hash2\tauthor2\tdate2\ttext2')
    };

    const historyList = await git.gitHistory(1,2);

    assert.deepEqual(historyList, [
      {
        hash: 'hash1',
        author: 'author1',
        timestamp: 'date1',
        msg: 'text1'
      },
      {
        hash: 'hash2',
        author: 'author2',
        timestamp: 'date2',
        msg: 'text2'
      }
    ])

  });

  it('Разбивает в истории коммитов строку коммита на объект', function () {
    const git = new Git();
    const line = 'hashTemp\tauthorMain\t01012018\tdescribe';
    const result = git.parseHistoryItem(line);

    assert.deepEqual(result, {
      hash: 'hashTemp',
      author: 'authorMain',
      timestamp: '01012018',
      msg: 'describe'}
    );
  });

  it('Получаем из строки объект в tree object', function () {
    const git = new Git();
    const line = '1111 blob c1c1\tfile';
    const result = git.parseFileTreeItem(line);

    assert.deepEqual(result, {
      type: 'blob',
      hash: 'c1c1',
      path: 'file'
    })
  });
});