const { expect } = require('chai');
const { buildObjectUrl, buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('./utils/navigation');
var assert = require('assert');

const hash = '90180910fc27a11272a3e5caeeb119a51e5c0545';
const file = 'package.json';
const folder = 'bin';

describe('buildObjectUrl', () => {
  it('Должна возвращать url директории', () => {
    result = buildObjectUrl(hash, folder, 'tree');
    expect(result).to.be.a('string', '/files/' + hash + '/' + folder);
  });
  it('Должна возвращать url файла', () => {
    result = buildObjectUrl(hash, file, 'blob');
    expect(result).to.be.a('string', '/content/' + hash + '/' + file);
  });
});

describe('buildFolderUrl', () => {
  it('Должна возвращать url директории', () => {
    result = buildFolderUrl(hash, folder);
    expect(result).to.be.a('string', '/files/' + hash + '/' + folder);
  });
});

describe('buildFileUrl', () => {
  it('Должна возвращать url файла', () => {
    result = buildFileUrl(hash, file);
    expect(result).to.equal('/content/' + hash + '/' + file);
  });
});

describe('buildBreadcrumbs', () => {
  it('Должна возвращать HISTORY', () => {
    result = buildBreadcrumbs();
    expect(result).to.deep.equal([ { text: 'HISTORY', href: undefined } ]);
  });
  it('Должна возвращать HISTORY / ROOT', () => {
    result = buildBreadcrumbs(hash, '');
    expect(result).to.deep.equal([ { text: 'HISTORY', href: '/' }, { text: 'ROOT', href: undefined } ]);
  });
  it('Должна возвращать HISTORY / ROOT / file', () => {
    result = buildBreadcrumbs(hash, file);
    expect(result[0]).to.deep.equal([ { text: 'HISTORY', href: '/' }, { text: 'ROOT', href: '/files/' + hash + '/' }, { text: file } ][0]);
  });
});


// AssertionError: expected { text: 'HISTORY', href: undefined } to equal { text: 'HISTORY', href: undefined }
