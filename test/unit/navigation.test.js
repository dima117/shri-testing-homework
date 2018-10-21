const { expect } = require('chai');
const {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs
} = require('../../utils/navigation');

describe('Блок навигации', () => {
  const path = 'testing-folder/testing-file.asm';
  const hash = 'testing-hash';

  describe('Метод buildFolderUrl', () => {
    it('Правильно генерируется путь для списка коммитов', () => {
      let result = buildFolderUrl(hash);
      expect(result).to.equal(`/files/${hash}/`);
    });
    
    it('Правильно генерируется путь для отдельного коммита', () => {
      let result = buildFolderUrl(hash, path);
      expect(result).to.equal(`/files/${hash}/${path}`);
    });
  });

  describe('Метод buildFileUrl', () => {
    let result = buildFileUrl(hash, path);
    it('Правильно генерируется путь к файлу', () => {
      expect(result).to.equal(`/content/${hash}/${path}`);
    });
  });

  describe('Метод buildBreadcrumbs', () => {
    describe('Корректная работа при отсутствии аргументов', () => {
      let bc = buildBreadcrumbs();
      let bcHistory = bc.find(el => el.text === 'HISTORY');
      it('HISTORY имеет правильное имя', () => {
        expect(bcHistory).to.have.property('text', 'HISTORY');
      });
      it('Для HISTORY не задан путь', () => {
        expect(bcHistory.href).to.be.undefined;
      });
    });
  
    describe('Корректная работа при задании аргумента hash', () => {
      let bc = buildBreadcrumbs(hash);
      let bcRoot = bc.find(el => el.text === 'ROOT');
      let bcHistory = bc.find(el => el.text === 'HISTORY');
      it('ROOT имеет правильное имя', () => {
        expect(bcRoot).to.have.property('text', 'ROOT');
      });
      it('Для ROOT не задан путь', () => {
        expect(bcRoot.href).to.be.undefined;
      });
      it('Для HISTORY задан путь "/" ', () => {
        expect(bcHistory.href).to.be.equal('/');
      });
    });

    describe('Корректная работа при задании аргументов hash и path', () => {
      const folder = path.split('/').shift();
      const file = path.split('/').pop();
      let bc = buildBreadcrumbs(hash, path);
      let bcRoot = bc.find(el => el.text === 'ROOT');
      let bcFolder = bc.find(el => el.text === folder);
      let bcFile = bc.find(el => el.text === file);

      it(`ROOT имеет правильный путь`, () => {
        expect(bcRoot.href).to.be.equal(`/files/${hash}/`);
      });
      it(`Папка имеет правильное имя`, () => {
        expect(bcFolder.text).to.be.equal(`${folder}`);
      });
      it(`Папка имеет правильный путь`, () => {
        expect(bcFolder.href).to.be.equal(`/files/${hash}/${folder}/`);
      });
      it(`Файл имеет правильное имя`, () => {
        expect(bcFile.text).to.be.equal(`${file}`);
      });
      it(`Файлу не задан путь`, () => {
        expect(bcFile.href).to.be.undefined;
      });
      it(`Хлебные крошки содержат правильное количество элементов`, () => {
        expect(bc.length).to.be.equal(2 + path.split('/').length);
      });

    });
  
  });

});
