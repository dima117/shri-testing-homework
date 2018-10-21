const {buildBreadcrumbs} = require('../utils/navigation');
const {expect} = require('chai');

describe('Breadcrumbs for not empty hash', function() {
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
      path: '',
      expected: [
        { text: 'HISTORY', href: '/' },
        { text: 'ROOT', href: undefined }
      ]
    },
  ];

  testCases.forEach(function(test) {
    it('correctly work with ' + test.path.split('/').filter(Boolean).length + ' paths points', function() {
      const result = buildBreadcrumbs(hash, test.path);
      expect(result).to.deep.equal(test.expected);
    });
  });
});
