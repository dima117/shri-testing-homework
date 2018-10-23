const {
  renderData,
  buildListData,
  buildFilesData
} = require('./prepareData');
const {expect} = require('chai');

describe('Data for render', function () {
  it('has right format', function () {
    const title = 'someTitle';
    const hash = 'dae6c657876620962432ef21a50a3b7f40272d06';
    const path = 'bin';
    const data = [
      {
        type: 'blob',
        hash: 'd7b47df17ba8ea90f706bf9c92f9a7fc14579744',
        path: 'bin/www',
        href: '/content/dae6c657876620962432ef21a50a3b7f40272d06/bin/www',
        name: 'www'
      }
    ];

    const expected =
      {
        title: title,
        breadcrumbs:
          [{text: 'HISTORY', href: '/'},
            {
              text: 'ROOT',
              href: '/files/dae6c657876620962432ef21a50a3b7f40272d06/'
            },
            {text: 'bin'}],
        data:
          [{
            type: 'blob',
            hash: 'd7b47df17ba8ea90f706bf9c92f9a7fc14579744',
            path: 'bin/www',
            href: '/content/dae6c657876620962432ef21a50a3b7f40272d06/bin/www',
            name: 'www'
          }]
      };

    const result = renderData(title, data, hash, path);

    expect(result).to.deep.equal(expected);
  });
});

describe('Commits list', function () {
  it('has right format', async function () {
    const history = [
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
      }
    ];
    const stubGitHistory = () => {
      return Promise.resolve(history)
    };
    const expected = [
      {
        hash: '90180910fc27a11272a3e5caeeb119a51e5c0545',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 12:49:56 +0300',
        msg: 'исправлена опечатка в readme',
        href: '/files/90180910fc27a11272a3e5caeeb119a51e5c0545/'
      },
      {
        hash: 'cc2284293758e32c50fa952da2f487c8c5e8d023',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 12:36:32 +0300',
        msg: 'readme',
        href: '/files/cc2284293758e32c50fa952da2f487c8c5e8d023/'
      }
    ];

    const result = await buildListData(1, 2, stubGitHistory);

    expect(result).to.deep.equal(expected);
  });
});

describe('Files list', function () {
  it('has right format', async function () {
    const hash = '38429bed94bd7c107c65fed6bffbf443ff0f4183';
    const path = 'views/';
    const files = [
      {
        type: 'blob',
        hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
        path: 'views/.gitignore'
      },
      {
        type: 'tree',
        hash: '8b4a09f575b860abf8076352354858d8e9f3a617',
        path: 'views/bin'
      },

    ];
    const stubGitFileTree = () => {
      return Promise.resolve(files)
    };
    const expected = [
      {
        type: 'blob',
        hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
        path: 'views/.gitignore',
        href: '/content/38429bed94bd7c107c65fed6bffbf443ff0f4183/views/.gitignore',
        name: '.gitignore'
      },
      {
        type: 'tree',
        hash: '8b4a09f575b860abf8076352354858d8e9f3a617',
        path: 'views/bin',
        href: '/files/38429bed94bd7c107c65fed6bffbf443ff0f4183/views/bin',
        name: 'bin'
      }
    ];

    const result = await buildFilesData(hash, path, stubGitFileTree);

    expect(result).to.deep.equal(expected);
  });
});
