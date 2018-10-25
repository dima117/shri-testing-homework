const { use, expect } = require('chai');
use(require('chai-shallow-deep-equal'));

const { buildFolderUrl, buildBreadcrumbs, buildObjectUrl } = require('../utils/navigation');

const hash = '0e82282ad8e8f14a76aadcd5724842ca8d1ad71d';
const pathFolder = 'utils';
const pathFile = 'navigation.js';
const pathFileFull = `${pathFolder}/${pathFile}`;

describe('Используем хелпер navigation', () => {
  describe('вызываем функцию buildFolderUrl', () => {
    it('получаем url по hash без передачи path', () => {
      const href = buildFolderUrl(hash);

      expect(href).to.equal(`/files/${hash}/`);
    });
  });

  describe('вызываем функцию buildBreadcrumbs', () => {
    it('получаем крошки без параметров', () => {
      const bc = buildBreadcrumbs();

      expect(bc).to.shallowDeepEqual([{ text: 'HISTORY', href: undefined }]);
    });

    it('получаем крошки по hash', () => {
      const bc = buildBreadcrumbs(hash);

      expect(bc).to.shallowDeepEqual([{ text: 'HISTORY', href: '/' }, { text: 'ROOT', href: undefined }]);
    });

    it('получаем крошки по hash и path', () => {
      const bc = buildBreadcrumbs(hash, pathFileFull);

      expect(bc).to.shallowDeepEqual([
        { text: 'HISTORY', href: '/' },
        { text: 'ROOT', href: `/files/${hash}/` },
        { text: pathFolder, href: `/files/${hash}/${pathFolder}/` },
        { text: pathFile }
      ]);
    });
  });

  describe('вызываем функцию buildObjectUrl', () => {
    it('получаем url по hash и path с предачей type = tree', () => {
      const href = buildObjectUrl(hash, {
        path: pathFolder,
        type: 'tree'
      });

      expect(href).to.equal(`/files/${hash}/${pathFolder}`);
    });

    it('получаем url hash и path с предачей type = blob', () => {
      const href = buildObjectUrl(hash, {
        path: pathFileFull,
        type: 'blob'
      });

      expect(href).to.equal(`/content/${hash}/${pathFileFull}`);
    });

    it('получаем url hash и path hash без type', () => {
      const href = buildObjectUrl(hash, {});

      expect(href).to.equal('#');
    });
  });
});
