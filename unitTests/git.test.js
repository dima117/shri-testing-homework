const { expect } = require('chai');
const { Git } = require('../utils/git');

describe('класс Git', () => {
  describe('метод getHistory', function () {
    it('можно получить историю коммитов', async function () {
      // подготовка
      const git = new Git();
      const page = 1;
      const size = 20;
      const fakeCMDOutput = '3721b70cd9ab74794c5e0e3cd2acf11f43521c99\tDmitry Andriyanov\t2018-10-16 01:00:38 +0300\tистория коммитов\n38429bed94bd7c107c65fed6bffbf443ff0f4183\tDmitry Andriyanov\t2018-10-15 13:22:09 +0300\tзаготовка приложения';
      const fakeHistory = [
        {
          hash: '3721b70cd9ab74794c5e0e3cd2acf11f43521c99',
          author: 'Dmitry Andriyanov',
          timestamp: '2018-10-16 01:00:38 +0300',
          msg: 'история коммитов'
        },
        {
          hash: '38429bed94bd7c107c65fed6bffbf443ff0f4183',
          author: 'Dmitry Andriyanov',
          timestamp: '2018-10-15 13:22:09 +0300',
          msg: 'заготовка приложения'
        }
      ];

      // действие
      git.executeGit = () => {
        return Promise.resolve(fakeCMDOutput);
      }

      const history = await git.getHistory(page, size);

      // проверка
      expect(history).to.eql(fakeHistory);
    });

    it('в случае ошибки должно выбрасываться исключение', async function () {
      // подготовка
      const git = new Git();
      const someError = new Error('some error');

      // действие
      git.executeGit = () => {
        return Promise.reject(someError);
      }

      let thrownError;
      try {
        await git.getHistory();
      } catch (error) {
        thrownError = error;
      }

      // проверка
      expect(thrownError).to.eql(someError);
    });
  });

  describe('метод getFileTree', function () {
    it('можно получить список файлов для выбранного коммита', async function () {
      // подготовка
      const git = new Git();
      const hash = '90180910fc27a11272a3e5caeeb119a51e5c0545';
      const path = 'controlers/'
      const fakeCMDOutput = '040000 tree 0c174efd10167e419bca53f98fde0611072258ba\tutils\n040000 tree 4c0e80c9ffcda3ef1a11b2d8ecd552418dad68b5\tviews\n';
      const fakeFileTree = [
        {
          type: 'tree',
          hash: '0c174efd10167e419bca53f98fde0611072258ba',
          path: 'utils'
        },
        {
          type: 'tree',
          hash: '4c0e80c9ffcda3ef1a11b2d8ecd552418dad68b5',
          path: 'views'
        }
      ];

      // действие
      git.executeGit = () => {
        return Promise.resolve(fakeCMDOutput);
      }

      const fileTree = await git.getFileTree(hash, path);

      // проверка
      expect(fileTree).to.eql(fakeFileTree);
    });

    it('в случае ошибки должно выбрасываться исключение', async function () {
      // подготовка
      const git = new Git();
      const someError = new Error('some error');

      // действие
      git.executeGit = () => {
        return Promise.reject(someError);
      }

      let thrownError;
      try {
        await git.getFileTree();
      } catch (error) {
        thrownError = error;
      }

      // проверка
      expect(thrownError).to.eql(someError);
    });
  });

  describe('метод getFileContent', function () {
    it('можно получить содержимое выбранного файла', async function () {
      // подготовка
      const git = new Git();
      const hash = 'ead09676a936eb50ed700dad0d280d65c3df21d8';
      const fakeCMDOutput = '# Домашнее задание: автотесты\n\nВам дано приложение на JavaScript и нужно написать для него автотесты: интеграционные тесты на интерфейс и модульные тесты на серверную часть.\n\n';

      // действие
      git.executeGit = () => {
        return Promise.resolve(fakeCMDOutput);
      }

      const fileContent = await git.getFileContent(hash);

      // проверка
      expect(fileContent).to.eql(fakeCMDOutput);
    });

    it('в случае ошибки должно выбрасываться исключение', async function () {
      // подготовка
      const git = new Git();
      const someError = new ReferenceError('some error');

      // действие
      git.executeGit = () => {
        return Promise.reject(someError);
      }

      let thrownError;
      try {
        await git.getFileContent();
      } catch (error) {
        thrownError = error;
      }

      // проверка
      expect(thrownError).to.eql(someError);
    });
  });
});
