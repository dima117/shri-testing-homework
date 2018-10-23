const { expect } = require('chai');
const { 
  generateContent,
  generateFiles,
  generateList, 
  buildObjectUrl } = require('../../utils/generateData'); 

describe('Файл generateData.js', () => {
  const path = ['path#1', 'path#2', 'path#3'];
  const hash = 'testing-hash';
  const content = 'testing-content';
  const files = [
    {
      type: 'tree',
      hash: 'testing-hash#1',
      path: 'testing-path#1',
      href: `/files/${hash}/testing-path#1`,
      name: 'testing-path#1'
    },
    {
      type: 'blob',
      hash: 'testing-hash#2',
      path: 'testing-path#2',
      href: `/content/${hash}/testing-path#2`,
      name: 'testing-path#2'
    }
  ];
  const history = [
    {
      hash: 'testing-hash#1',
      author: 'testing-author#1',
      timestamp: 'date#1',
      msg: 'testing-msg#1',
      href: `/files/${files[0].hash}/`
    },
    {
      hash: 'testing-hash#2',
      author: 'testing-author#2',
      timestamp: 'date#2',
      msg: 'testing-msg#2',
      href: `/files/${files[1].hash}/`
    }
  ];
  
  describe('Метод buildObjectUrl', () => {
    it('Корректная работа для tree-объектов', () => {
      let type = 'tree';
      let result = buildObjectUrl(hash, {path, type});
      expect(result).to.equal(`/files/${hash}/${path}`);
    });
    it('Корректная работа для blob-объектов', () => {
      let type = 'blob';
      let result = buildObjectUrl(hash, {path, type});
      expect(result).to.equal(`/content/${hash}/${path}`);
    });
    it('Корректная работа для других типов', () => {
      let type = '#';
      let result = buildObjectUrl(hash, {path, type});
      expect(result).to.equal(`#`);
    });
  });

  describe('Метод generateContent', () => {
    let result = generateContent(hash, path, content);
    it('Содержит корректный заголовок', () => {
      expect(result).to.have.property('title', 'content');
    });
    it('Содержит хлебные крошки', () => {
      expect(result).to.have.property('breadcrumbs');
    });
    it('Содержит корректный контент', () => {
      expect(result.content).to.equal(content);
    });
  });

  describe('Метод generateFiles', () => {
    let result = generateFiles(hash, path, files);
    it('Содержит корректный заголовок', () => {
      expect(result).to.have.property('title', 'files');
    });
    it('Содержит хлебные крошки', () => {
      expect(result).to.have.property('breadcrumbs');
    });
    it('Содержит корректные файлы', () => {
      expect(result.files).to.deep.equal(files);
    });
  });

  describe('Метод generateList', () => {
    let result = generateList(history);
    it('Содержит корректный заголовок', () => {
      expect(result).to.have.property('title', 'history');
    });
    it('Содержит хлебные крошки', () => {
      expect(result).to.have.property('breadcrumbs');
    });
    it('Содержит корректные файлы', () => {
      expect(result.list).to.deep.equal(history);
    });
  });

});