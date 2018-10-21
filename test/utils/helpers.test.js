const { expect } = require('chai');

const {
  getOffset,
  parseFileTreeItem,
  parseHistoryItem
} = require('../../utils/helpers');

const testOffset = params => {
  it(`should return offset for page=${params.page} with size=${
    params.size
  }`, () => {
    const result = getOffset(params.page, params.size);
    expect(result).to.eq((params.page - 1) * params.size);
  });
};

describe('utils/helpers', () => {
  describe('getOffset', () => {
    const offsetParams = [
      { page: 1, size: 10 },
      { page: 2, size: 20 },
      { page: 3, size: 0 },
      { page: 5, size: 1 }
    ];

    offsetParams.map(params => testOffset(params));
  });

  describe('parseFileTreeItem', () => {
    it('should split string for type, hash and path', () => {
      const line = 'info type hash	path';
      const result = parseFileTreeItem(line);
      expect(result).to.deep.equal({
        type: 'type',
        hash: 'hash',
        path: 'path'
      });
    });
  });

  describe('parseHistoryItem', () => {
    it('should split string for hash, author, timestamp and msg', () => {
      const line = 'hash	author	timestamp	commitMsg';
      const result = parseHistoryItem(line);
      expect(result).to.deep.equal({
        hash: 'hash',
        author: 'author',
        timestamp: 'timestamp',
        msg: 'commitMsg'
      });
    });
  });
});
