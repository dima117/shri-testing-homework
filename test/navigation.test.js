const { buildFileUrl, buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');
const assert = require('assert');

describe('Проверка методов navigation.js', function () {
    describe('buildFolderUrl', function () {
        it('создает путь к папке', function () {
            assert.strictEqual(buildFolderUrl('a', 'b'), '/files/a/b');
        });
    });

    describe('buildFileUrl', function () {
        it('создает путь к файлу', function () {
            assert.strictEqual(buildFileUrl('a', 'b'), '/content/a/b');
        });
    });

    describe('buildBreadcrumbs', function () {
        it('если hash не передан', function () {
            assert.deepEqual(buildBreadcrumbs(), [
                {
                text: 'HISTORY',
                href: undefined
                }
            ]);
        });

        it('если path не передан', function () {
            assert.deepEqual(buildBreadcrumbs('hash'), [
              { text: 'HISTORY', href: '/' },
              { text: 'ROOT', href: undefined }
          ]);
        });

        it('buildBreadcrumbs path имеет значение', function () {
            assert.deepEqual(buildBreadcrumbs('hash', 'README.md'), [
              { text: 'HISTORY', href: '/' },
              { 
                  text: 'ROOT',
                  href: '/files/hash/'
              },
              { text: 'README.md' }
          ]);
        });
    });
})
