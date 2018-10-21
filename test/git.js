const path = require('path');
const {expect} = require('chai');
const GitUtils = require('../utils/git');

describe('GitUtils', () => {
  it('parseHistoryItem: парсит конкретный коммит', () => {
    const gitUtils = new GitUtils();
    const line = `38429be\tuserName\tMon Oct 15 13:22:09 2018 +0300\tcommit message`;
    const result = gitUtils.parseHistoryItem(line);
    expect(result).to.deep.equal({
      hash: '38429be',
      author: 'userName',
      timestamp: 'Mon Oct 15 13:22:09 2018 +0300',
      msg: 'commit message'
    })
  });

  it('parseFileTreeItem: парсит файлы конкретного коммита', () => {
    const gitUtils = new GitUtils();
    const result = gitUtils.parseFileTreeItem('100644 blob ead09676a936eb50ed700dad0d280d65c3df21d8\tREADME.md');
    expect(result).to.deep.equal({
      type: 'blob',
      hash: 'ead09676a936eb50ed700dad0d280d65c3df21d8',
      path: 'README.md'
    })
  })
});
