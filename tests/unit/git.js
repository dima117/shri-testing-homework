const { expect } = require('chai');

const gitUtils = require('../../utils/git');

const CMD_ARGS = {
  'git ls-tree hash': '1 blob hash1\tfile.js\n2 tree hash2\tfolder',
  'git ls-tree hash path': '1 blob hash1\tfile.js\n2 tree hash2\tfolder',
  'git show hash': 'file content',
  'git log --pretty=format:%H%x09%an%x09%ad%x09%s --date=iso --skip 0 -n 1':
    'hash1\tauthor1\ttimestamp1\tmsg1\nhash2\tauthor2\ttimestamp2\tmsg2',
  'git log --pretty=format:%H%x09%an%x09%ad%x09%s --date=iso --skip 0 -n 10':
    'hash1\tauthor1\ttimestamp1\tmsg1\nhash2\tauthor2\ttimestamp2\tmsg2'
};

gitUtils.cliExecutor = function(cmd, args) {
  return new Promise(resolve => {
    resolve(CMD_ARGS[`${cmd} ${args.join(' ')}`]);
  });
};

describe('проверка git', function() {
  it('можно получить file-tree', async function() {
    // подготовка
    const hash = 'hash';
    const path = 'path';
    const expectedResult = [
      { type: 'blob', hash: 'hash1', path: 'file.js' },
      { type: 'tree', hash: 'hash2', path: 'folder' }
    ];

    // действие
    const content = await gitUtils.gitFileTree(hash, path);

    // проверка
    expect(content).to.deep.equal(expectedResult);
  });

  it('можно получить file-tree без передачи path', async function() {
    // подготовка
    const hash = 'hash';
    const expectedResult = [
      { type: 'blob', hash: 'hash1', path: 'file.js' },
      { type: 'tree', hash: 'hash2', path: 'folder' }
    ];

    // действие
    const content = await gitUtils.gitFileTree(hash);

    // проверка
    expect(content).to.deep.equal(expectedResult);
  });

  it('можно получить file-content', async function() {
    // подготовка
    const hash = 'hash';
    const expectedResult = 'file content';

    // действие
    const content = await gitUtils.gitFileContent(hash);

    // проверка
    expect(content).to.equal(expectedResult);
  });

  it('можно получить git-history', async function() {
    // подготовка
    const expectedResult = [
      { hash: 'hash1', author: 'author1', timestamp: 'timestamp1', msg: 'msg1' },
      { hash: 'hash2', author: 'author2', timestamp: 'timestamp2', msg: 'msg2' }
    ];

    // действие
    const content = await gitUtils.gitHistory(1, 1);

    // проверка
    expect(content).to.deep.equal(expectedResult);
  });

  it('можно получить git-history без передачи page, size', async function() {
    // подготовка
    const expectedResult = [
      { hash: 'hash1', author: 'author1', timestamp: 'timestamp1', msg: 'msg1' },
      { hash: 'hash2', author: 'author2', timestamp: 'timestamp2', msg: 'msg2' },
    ];

    // действие
    const content = await gitUtils.gitHistory();

    // проверка
    expect(content).to.deep.equal(expectedResult);
  });
});
