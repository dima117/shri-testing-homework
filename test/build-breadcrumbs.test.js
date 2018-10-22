const { buildBreadcrumbs } = require('../utils/navigation');
const { assert } = require('chai');

suite(`buildBreadcrumbs`, () => {
  test(`should return HISTORY (w/o href) when hash is undefined `, () => {
    const hash = undefined;

    const actual = buildBreadcrumbs(hash);
    const expected = [
      {
        text: 'HISTORY',
        href: undefined
      }
    ];

    assert.deepEqual(actual, expected);
  });

  test(`should return HISTORY and ROOT (w/o link) when path is undefined`, () => {
    const hash = 'f14d98df73bb0e8dd276edf43019b7244557f8b0';
    const path = undefined;

    const actual = buildBreadcrumbs(hash, path);
    const expected = [
      {
        text: 'HISTORY',
        href: '/'
      },
      {
        text: 'ROOT',
        href: undefined
      }
    ];

    assert.deepEqual(actual, expected);
  });

  test(`should return full BC when hash and path are defined`, () => {
    const hash = 'f14d98df73bb0e8dd276edf43019b7244557f8b0';
    const path = 'project/folder/content.txt';

    const actual = buildBreadcrumbs(hash, path);
    const expected = [
      {
        text: 'HISTORY',
        href: '/'
      },
      {
        text: 'ROOT',
        href: '/files/f14d98df73bb0e8dd276edf43019b7244557f8b0/'
      },
      {
        text: 'project',
        href: '/files/f14d98df73bb0e8dd276edf43019b7244557f8b0/project/'
      },
      {
        text: 'folder',
        href: '/files/f14d98df73bb0e8dd276edf43019b7244557f8b0/project/folder/'
      },
      {
        text: 'content.txt'
      }
    ];

    assert.deepEqual(actual, expected);
  });
});
