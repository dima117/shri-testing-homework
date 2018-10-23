const { buildBreadcrumbs, buildFolderUrl, buildFileUrl } = require('./navigation');
const {expect} = require('chai');

const getNumberOfPathPoints = (path) => {
  return (path || '').split('/').filter(Boolean).length
};

describe('Breadcrumbs with not empty hash', function() {
  const hash = '90180910fc27a11272a3e5caeeb119a51e5c0545';
  const testCases = [
    {
      path: 'bin/www',
      expected: [
        {text: 'HISTORY', href: '/'},
        {
          text: 'ROOT',
          href: '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/'
        },
        {
          text: 'bin',
          href: '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/bin/'
        },
        {text: 'www'}
      ]
    },
    {
      path: 'bin',
      expected: [
        { text: 'HISTORY', href: '/' },
        { text: 'ROOT',
          href: '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/' },
        { text: 'bin' }
      ]
    },
    {
      path: undefined,
      expected: [
        { text: 'HISTORY', href: '/' },
        { text: 'ROOT', href: undefined } // undefined это не норм, но такое поведение у функции. Я просто тестирую
      ]
    },
  ];

  testCases.forEach(function(test) {
    it('correctly work with ' + getNumberOfPathPoints(test.path) + ' path points', function() {
      const result = buildBreadcrumbs(hash, test.path);
      expect(result).to.deep.equal(test.expected);
    });
  });
});

describe('Breadcrumbs with empty hash', function() {
  const hash = '';
  const testCases = [
    {
      path: 'bin',
      expected: [
        { text: 'HISTORY', href: undefined },
      ]
    },
    {
      path: undefined,
      expected: [
        { text: 'HISTORY', href: undefined },
      ]
    },
  ];

  testCases.forEach(function(test) {
    it('correctly work with ' + getNumberOfPathPoints(test.path) + ' path points', function() {
      const result = buildBreadcrumbs(hash, test.path);
      expect(result).to.deep.equal(test.expected);
    });
  });
});

describe('Folder url', function() {
  const hash = '123';
  const prefix = '/files';
  const testCases = [
    {
      path: 'bin',
      expected: [prefix, hash, 'bin'].join('/')
    },
    {
      path: undefined,
      expected: [prefix, hash, ''].join('/')
    },
  ];

  testCases.forEach(function(test) {
    it('correctly work with ' + getNumberOfPathPoints(test.path) + ' path points', function() {
      const result = buildFolderUrl(hash, test.path);
      expect(result).to.deep.equal(test.expected);
    });
  });
});

describe('File url', function() {
  const hash = '123';
  const prefix = '/content';
  const testCases = [
    {
      path: 'index.js',
      expected: [prefix, hash, 'index.js'].join('/')
    },
    {
      path: undefined,
      expected: [prefix, hash, 'undefined'].join('/')
    },
  ];

  testCases.forEach(function(test) {
    it('correctly work with ' + getNumberOfPathPoints(test.path) + ' path points', function() {
      const result = buildFileUrl(hash, test.path);
      expect(result).to.deep.equal(test.expected);
    });
  });
});
