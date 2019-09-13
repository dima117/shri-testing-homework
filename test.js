const Git = require('./utils/git');
const Navigation = require('./utils/navigation');

const { expect } = require('chai');

describe('utils/git.js', () => {
  it('Возвращаемые гитом строки правильно разбиваются на массив', () => {
    // подготовка
    const executeGitResult = 
    '66a4df175bb4bff677adffc313652067dcf0d93e\tMax Shevkoplias\t2018-10-19 10:13:43 +0300\tкакие-то изменения\n' +
    '90180910fc27a11272a3e5caeeb119a51e5c0545\tDmitry Andriyanov\t2018-10-16 12:49:56 +0300\tисправлена опечатка в readme\n' +
    'cc2284293758e32c50fa952da2f487c8c5e8d023\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
    '7e013ae0440ad6e91082599376a6aaebe20d2112\tDmitry Andriyanov\t2018-10-16 12:10:05 +0300\tcodestyle\n' +
    'f2df8ac23e817f6da01624a77ec050a0147f642a\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили\n';
    const func = el => el;

    // действие
    const mock = Git.parseExecuteGit(executeGitResult, func);

    // проверка
    const res = [
      '66a4df175bb4bff677adffc313652067dcf0d93e\tMax Shevkoplias\t2018-10-19 10:13:43 +0300\tкакие-то изменения',
      '90180910fc27a11272a3e5caeeb119a51e5c0545\tDmitry Andriyanov\t2018-10-16 12:49:56 +0300\tисправлена опечатка в readme',
      'cc2284293758e32c50fa952da2f487c8c5e8d023\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme',
      '7e013ae0440ad6e91082599376a6aaebe20d2112\tDmitry Andriyanov\t2018-10-16 12:10:05 +0300\tcodestyle',
      'f2df8ac23e817f6da01624a77ec050a0147f642a\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили'
    ];
    expect(mock).to.deep.eq(res);
  });

  it('Вернулись верные данные из истории коммитов', async () => {
    // подготовка
    const page = 1;
    const size = 5;
    const executeGitResult = 
    '66a4df175bb4bff677adffc313652067dcf0d93e\tMax Shevkoplias\t2018-10-19 10:13:43 +0300\tкакие-то изменения\n' +
    '90180910fc27a11272a3e5caeeb119a51e5c0545\tDmitry Andriyanov\t2018-10-16 12:49:56 +0300\tисправлена опечатка в readme\n' +
    'cc2284293758e32c50fa952da2f487c8c5e8d023\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
    '7e013ae0440ad6e91082599376a6aaebe20d2112\tDmitry Andriyanov\t2018-10-16 12:10:05 +0300\tcodestyle\n' +
    'f2df8ac23e817f6da01624a77ec050a0147f642a\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили\n';
    Git.executeGit = () => {
      return Promise.resolve(executeGitResult);
    };

    // действие
    const mock = await Git.gitHistory(page, size);

    // проверка
    const res = [
      {
        hash: '66a4df175bb4bff677adffc313652067dcf0d93e',
        author: 'Max Shevkoplias',
        timestamp: '2018-10-19 10:13:43 +0300',
        msg: 'какие-то изменения'
      },
      {
        hash: '90180910fc27a11272a3e5caeeb119a51e5c0545',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 12:49:56 +0300',
        msg: 'исправлена опечатка в readme'
      },
      {
        hash: 'cc2284293758e32c50fa952da2f487c8c5e8d023',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 12:36:32 +0300',
        msg: 'readme'
      },
      {
        hash: '7e013ae0440ad6e91082599376a6aaebe20d2112',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 12:10:05 +0300',
        msg: 'codestyle'
      },
      {
        hash: 'f2df8ac23e817f6da01624a77ec050a0147f642a',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 12:02:11 +0300',
        msg: 'стили'
      }
    ];
    expect(mock).to.deep.eq(res);
  });

  it('Вернулись верные данные из коммита', async () => {
    // подготовка
    const executeGitResult = 
    '100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8\t.gitignore\n' +
    '100644 blob ead09676a936eb50ed700dad0d280d65c3df21d8\tREADME.md\n' +
    '100644 blob 70461d5f9009344d9933e889b0448aa3f18d83d9\tapp.js\n' +
    '040000 tree 152db3caa8a0d01acc76abc9df36e6b432ad1e55\tbin\n' +
    '040000 tree c52fa4f12adafae357de1d8748f89787ae30431e\tcontrollers\n' +
    '040000 tree 6a033b657f10911ad9b65c27c3f9b6fb6130b058\tpublic\n' +
    '040000 tree 0c1d853fcb534b3d50a423871629e4a9993c58c8\tutils\n' +
    '040000 tree 4c0e80c9ffcda3ef1a11b2d8ecd552418dad68b5\tviews';
    Git.executeGit = () => {
      return Promise.resolve(executeGitResult);
    };

    // действие
    const mock = await Git.gitFileTree('any hash', 'path/to/folder');

    // проверка
    const res = [
      {
        type: 'blob',
        hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
        path: '.gitignore'
      },
      {
        type: 'blob',
        hash: 'ead09676a936eb50ed700dad0d280d65c3df21d8',
        path: 'README.md'
      },
      {
        type: 'blob',
        hash: '70461d5f9009344d9933e889b0448aa3f18d83d9',
        path: 'app.js'
      },
      {
        type: 'tree',
        hash: '152db3caa8a0d01acc76abc9df36e6b432ad1e55',
        path: 'bin'
      },
      {
        type: 'tree',
        hash: 'c52fa4f12adafae357de1d8748f89787ae30431e',
        path: 'controllers'
      },
      {
        type: 'tree',
        hash: '6a033b657f10911ad9b65c27c3f9b6fb6130b058',
        path: 'public'
      },
      {
        type: 'tree',
        hash: '0c1d853fcb534b3d50a423871629e4a9993c58c8',
        path: 'utils'
      },
      {
        type: 'tree',
        hash: '4c0e80c9ffcda3ef1a11b2d8ecd552418dad68b5',
        path: 'views'
      }
    ];
    expect(mock).to.deep.eq(res);
  });
});

describe('utils/navigation.js', () => {
  it('Получен правильный путь к папке по хешу', () => {
    // подготовка
    const hash = 'c1697931c52f3f4eb3d86a10c08c4e43e2dcb793';
    const path = 'controllers';

    // Действие
    const mock = Navigation.buildFolderUrl(hash, path);

    // Проверка
    const res = '/files/c1697931c52f3f4eb3d86a10c08c4e43e2dcb793/controllers';
    expect(mock).to.eq(res);
  });

  it('Получен правильный путь к файлу по хешу', () => {
    // подготовка
    const hash = 'c1697931c52f3f4eb3d86a10c08c4e43e2dcb793';
    const path = 'app.js';

    // Действие
    const mock = Navigation.buildFileUrl(hash, path);

    // Проверка
    const res = '/content/c1697931c52f3f4eb3d86a10c08c4e43e2dcb793/app.js';
    expect(mock).to.eq(res);
  });

  it('Получен правильный массив для хлебных крошек главной страницы', () => {
    // Подготовки нет ...
    // Действие
    const mock = Navigation.buildBreadcrumbs();

    // Проверка
    const res = [
      { text: 'HISTORY', href: undefined }
    ];
    expect(mock).to.deep.eq(res);
  });

  it('Получен правильный массив для хлебных крошек первого уровня', () => {
    // подготовка
    const hash = 'c1697931c52f3f4eb3d86a10c08c4e43e2dcb793';
    const path = 'app.js';

    // Действие
    const mock = Navigation.buildBreadcrumbs(hash, path);

    // Проверка
    const res = [
      { text: 'HISTORY', href: '/' },
      { text: 'ROOT', href: '/files/c1697931c52f3f4eb3d86a10c08c4e43e2dcb793/' },
      { text: 'app.js' }
    ];
    expect(mock).to.deep.eq(res);
  });

  it('Получен правильный массив для хлебных крошек глубокой вложенности', () => {
    // подготовка
    const hash = 'c1697931c52f3f4eb3d86a10c08c4e43e2dcb793';
    const path = 'controllers/indexController.js';

    // Действие
    const mock = Navigation.buildBreadcrumbs(hash, path);

    // Проверка
    const res = [
      { text: 'HISTORY', href: '/' },
      { text: 'ROOT', href: '/files/c1697931c52f3f4eb3d86a10c08c4e43e2dcb793/' },
      { text: 'controllers', href: '/files/c1697931c52f3f4eb3d86a10c08c4e43e2dcb793/controllers/' },
      { text: 'indexController.js' }
    ];
    expect(mock).to.deep.eq(res);
  });
});
