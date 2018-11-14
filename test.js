const Git = require('./utils/git');

const { expect } = require('chai');

describe('git.js', () => {
  it('Вернулись верные данные из истории коммитов', async () => {
    // подготовка
    const page = 1;
    const size = 5;
    const executeGitResult = '66a4df175bb4bff677adffc313652067dcf0d93e\tMax Shevkoplias\t2018-10-19 10:13:43 +0300\tкакие-то изменения\n90180910fc27a11272a3e5caeeb119a51e5c0545\tDmitry Andriyanov\t2018-10-16 12:49:56 +0300\tисправлена опечатка в readme\ncc2284293758e32c50fa952da2f487c8c5e8d023\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n7e013ae0440ad6e91082599376a6aaebe20d2112\tDmitry Andriyanov\t2018-10-16 12:10:05 +0300\tcodestyle\nf2df8ac23e817f6da01624a77ec050a0147f642a\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили\n';
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
    const executeGitResult = '100644\tblob\tb512c09d476623ff4bf8d0d63c29b784925dbdf8\t.gitignore\n100644\tblob\tead09676a936eb50ed700dad0d280d65c3df21d8\tREADME.md\n100644\tblob\t70461d5f9009344d9933e889b0448aa3f18d83d9\tapp.js\n040000\ttree\t152db3caa8a0d01acc76abc9df36e6b432ad1e55\tbin\n040000\ttree\tc52fa4f12adafae357de1d8748f89787ae30431e\tcontrollers\n100644\tblob\tbbf3076fce71449c5da4419200d0c9506ae204f3\tpackage-lock.json\n100644\tblob\tf735db02056e29dde140bbe28a6ff46fa9bc010e\tpackage.json\n040000\ttree\t6a033b657f10911ad9b65c27c3f9b6fb6130b058\tpublic\n040000\ttree\t0c1d853fcb534b3d50a423871629e4a9993c58c8\tutils\n040000\ttree\t4c0e80c9ffcda3ef1a11b2d8ecd552418dad68b5\tviews\n';
    Git.executeGit = async () => {
      return await executeGitResult;
    };

    // действие
    const mock = await Git.gitFileTree('any hash', 'path/to/folder');
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
        type: 'blob',
        hash: 'bbf3076fce71449c5da4419200d0c9506ae204f3',
        path: 'package-lock.json'
      },
      {
        type: 'blob',
        hash: 'f735db02056e29dde140bbe28a6ff46fa9bc010e',
        path: 'package.json'
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

    // проверка
    expect(mock).to.deep.eq(res);
  });

});
