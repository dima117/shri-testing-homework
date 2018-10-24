const { expect } = require('chai');
const {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs,
} = require('../../utils/navigation');

describe('Url Builders', () => {
  describe('File url builder (buildFileUrl)', () => {
    it('should return a valid path to the file', () => {
      const url = buildFileUrl('123abc', 'text-file.txt');

      expect(url).to.equal('/content/123abc/text-file.txt');
    });
  });


  describe('Folder url builder (buildFolderUrl)', () => {
    it('should return a valid path to the folder', () => {
      const url = buildFolderUrl('123abc', 'test-files');

      expect(url).to.equal('/files/123abc/test-files');
    });
  });
});


describe('Breadcrumbs builder (buildBreadcrumbs)', () => {
  it('should always return at least one crumb with the text \'HISTORY\'', () => {
    const pathArr = buildBreadcrumbs();

    expect(pathArr[0]).to.be.an('object').that.deep.includes({ text: 'HISTORY' });
  });

  it('should return first crumb that takes you back to the index page when given a single argument', () => {
    const pathArr = buildBreadcrumbs('hash123abc');

    expect(pathArr[0]).to.include({ href: '/', text: 'HISTORY' });
  });

  it('should return second crumb that shows you that you are at root folder. It should not have href', () => {
    const pathArr = buildBreadcrumbs('hash123abc');

    expect(pathArr[1]).to.include({ href: undefined, text: 'ROOT' });
  });


  it('should return a full path with href when given hash and name of the file', () => {
    const pathArr = buildBreadcrumbs('hash123abc', 'text-file.txt');

    expect(pathArr).to.deep.include({ href: '/files/hash123abc/', text: 'ROOT' }, { text: 'text-file.txt' });
  });
});
