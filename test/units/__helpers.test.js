const { expect } = require('chai');
const { parseFileTreeItem, parseHistoryItem } = require('../../utils/helpers');
const { parseFileTreeItemMock, parseHistoryItemMock } = require('../../mocks/index');

describe('Ф-ция "parseFileTreeItem" должна', () => {
  it('возвращать корректное значение', () => {
    const result = parseFileTreeItem(parseFileTreeItemMock);

    expect(result).to.deep.equal({
      type: 'blob',
      hash: 'ead09676a936eb50ed700dad0d280d65c3df21d8',
      path: 'README.md'
    });
  });

  it('возвращать корректную структуру', () => {
    const result = parseFileTreeItem(parseFileTreeItemMock);

    expect(result).to.have.all.keys('type', 'hash', 'path');
  })
});

describe('Ф-ция "parseHistoryItem" должна', () => {
  it('возвращать корректное значение', () => {
    const result = parseHistoryItem(parseHistoryItemMock);

    expect(result).to.deep.equal({
      author: 'Dmitry Andriyanov',
      hash: '90180910fc27a11272a3e5caeeb119a51e5c0545',
      timestamp: '2018-10-16 12:49:56+0300',
      msg: 'исправлена опечатка в readme',
    });
  });

  it('возвращать корректную структуру', () => {
    const result = parseHistoryItem(parseHistoryItemMock);

    expect(result).to.have.all.keys('author', 'hash', 'timestamp', 'msg');
  })
});
