const { buildBreadcrumbs } = require('../utils/navigation');
const { expect } = require('chai');
const { gitFileTree, gitFileContent, gitHistory } = require('../utils/git');

describe('buildBreadcrumbs', function() {
  it ('buildBreadcrumbsText: commitsList', function() {
    const hash = '';
    const path = '';
    let result;

    result = buildBreadcrumbs(hash, path);

    expect(result[0].text).to.eql('HISTORY');
  })

  it ('buildBreadcrumbsText: root', function() {
    const hash = '324d8349e13dad40ca1cf373f01b0712aaa51e00';
    const path = '';
    let result;

    result = buildBreadcrumbs(hash, path);

    expect(result.map(item => item.text)).to.eql(['HISTORY', 'ROOT']);
  })

  it ('buildBreadcrumbsText: root/folder', function() {
    const hash = '324d8349e13dad40ca1cf373f01b0712aaa51e00';
    const path = 'folder';
    let result;

    result = buildBreadcrumbs(hash, path);

    expect(result.map(item => item.text)).to.eql(['HISTORY', 'ROOT', 'folder']);
  })

  it ('buildBreadcrumbsText: root/folder/file', function() {
    const hash = '324d8349e13dad40ca1cf373f01b0712aaa51e00';
    const path = 'folder/file.test';
    let result;

    result = buildBreadcrumbs(hash, path);

    expect(result.map(item => item.text)).to.eql(['HISTORY', 'ROOT', 'folder', 'file.test']);
  })

  it ('buildBreadcrumbsHref: root', function() {
    const hash = '324d8349e13dad40ca1cf373f01b0712aaa51e00';
    const path = '';
    let result;

    result = buildBreadcrumbs(hash, path);

    expect(result[0].href).to.eql('/');
  })

  it ('buildBreadcrumbsHref: folder', function() {
    const hash = '324d8349e13dad40ca1cf373f01b0712aaa51e00';
    const path = '/folder/innerFolder';
    let result;

    result = buildBreadcrumbs(hash, path);

    expect(result.map(item => item.href)).to.eql(['/', `/files/${hash}/`, `/files/${hash}/folder/`, undefined]);
  })

  it ('buildBreadcrumbsHref: file', function() {
    const hash = '324d8349e13dad40ca1cf373f01b0712aaa51e00';
    const path = '/folder/file.test';
    let result;

    result = buildBreadcrumbs(hash, path);

    expect(result.map(item => item.href)).to.eql(['/', `/files/${hash}/`, `/files/${hash}/folder/`, undefined]);
  })

});

describe('git', function() {
  it('get File Content', () => {
    const resolvingPromise = gitFileContent('b512c09d476623ff4bf8d0d63c29b784925dbdf8');
    return resolvingPromise.then( (result) => {
      expect(result).to.equal('node_modules');
    });
  });

  it('get gitFileTree', () => {
    const hash = '324d8349e13dad40ca1cf373f01b0712aaa51e00';
    const path = '';
    const answer =  {
      type: 'blob',
      hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
      path: '.gitignore'
    };
    const resolvingPromise = gitFileTree(hash, path);

    return resolvingPromise.then( (result) => {
      expect(result[0]).to.deep.equal(answer);
    });
  });

  it('get gitHistory', () => {
    const answer = {
      'author': 'Jane Des',
      'hash': '324d8349e13dad40ca1cf373f01b0712aaa51e00',
      'msg': 'Added advance description',
      'timestamp': '2018-10-23 23:20:02 +0300'
    }
    const resolvingPromise = gitHistory(1, 1);
    return resolvingPromise.then( (result) => {
      expect(result[0]).to.deep.equal(answer);
    });
  });









});
