const { expect } = require('chai');
const { Navigation } = require('../../utils/navigation');

// Тестовые наборы данных

const testHash = 'cc2284293758e32c50fa952da2f487c8c5e8d023';
const testPath = 'package.json';
const testLongPath = 'my/cat/package.json';
const testNavigation = new Navigation();

describe('navigation.js — формирование url', () => {
  describe('buildFolderUrl — url директории', () => {
    it('Функция возвращает строку', () => {
      const result = testNavigation.buildFolderUrl(testHash);
      expect(result)
        .to
        .be
        .an('string');
    });
    it('Функция возвращает ожидаемый результат (без файла)', () => {
      const result = testNavigation.buildFolderUrl(testHash);
      expect(result)
        .to
        .eql('/files/cc2284293758e32c50fa952da2f487c8c5e8d023/');
    });
    it('Функция возвращает ожидаемый результат (с файлом)', () => {
      const result = testNavigation.buildFolderUrl(testHash, testPath);
      expect(result)
        .to
        .eql('/files/cc2284293758e32c50fa952da2f487c8c5e8d023/package.json');
    });
  });
  describe('buildFileUrl — url файла', () => {
    it('Функция возвращает строку', () => {
      const result = testNavigation.buildFileUrl(testHash, testPath);
      expect(result)
        .to
        .be
        .an('string');
    });
    it('Функция возвращает ожидаемый результат', () => {
      const result = testNavigation.buildFileUrl(testHash, testPath);
      expect(result)
        .to
        .eql('/content/cc2284293758e32c50fa952da2f487c8c5e8d023/package.json');
    });
  });
  describe('buildBreadcrumbs — хлебные крошки', () => {
    it('Функция возвращает массив', () => {
      const result = testNavigation.buildBreadcrumbs(testHash, testPath);
      expect(result)
        .to
        .be
        .an('array');
    });
    it('Функция возвращает ожидаемый результат', () => {
      const result = testNavigation.buildBreadcrumbs(testHash, testPath);
      expect(result)
        .to
        .eql([
          {
            text: 'HISTORY',
            href: '/',
          },
          {
            text: 'ROOT',
            href: '/files/cc2284293758e32c50fa952da2f487c8c5e8d023/',
          },
          { text: 'package.json' }]);
    });
    it('Функция возвращает ожидаемый результат с длинным путем', () => {
      const result = testNavigation.buildBreadcrumbs(testHash, testLongPath);
      expect(result)
        .eql([
          {
            text: 'HISTORY',
            href: '/',
          },
          {
            text: 'ROOT',
            href: '/files/cc2284293758e32c50fa952da2f487c8c5e8d023/',
          },
          {
            text: 'my',
            href: '/files/cc2284293758e32c50fa952da2f487c8c5e8d023/my/',
          },
          {
            text: 'cat',
            href: '/files/cc2284293758e32c50fa952da2f487c8c5e8d023/my/cat/',
          },
          { text: 'package.json' }]);
    });
    it('Функция обрабатывает исключения hash', () => {
      const result = testNavigation.buildBreadcrumbs(null, testPath);
      expect(result)
        .to
        .eql([{
          text: 'HISTORY',
          href: undefined,
        }]);
    });
    it('Функция обрабатывает исключения path', () => {
      const result = testNavigation.buildBreadcrumbs(testHash, null);
      expect(result)
        .to
        .eql([
          {
            text: 'HISTORY',
            href: '/',
          },
          {
            text: 'ROOT',
            href: undefined,
          }]);
    });
  });
});
