const {
  filesController
} = require("./filesController");

describe('', () => {
  const req = {
    params: {
      0: "package.json",
      hash: "e95b197aef0941e12e970da042afd4c2b1488225"
    }
  };

  const res = {
    render: jest.fn()
  };

  const next = jest.fn();

  const mocks = {
    gitFileTree: jest.fn(() => Promise.resolve([{
        type: 'blob',
        hash: 'd1c7ae5383bae90d4b1d636acfacd5ec7fa0843b',
        path: 'controllers/contentController.js'
      },
      {
        type: 'blob',
        hash: '02fe732137bea2adfb6f650bce92aa0be2f5cd9d',
        path: 'controllers/filesController.js'
      },
      {
        type: 'blob',
        hash: '0e3f100b8db850ebc6ca003312c328f73972cdec',
        path: 'controllers/indexController.js'
      }
    ])),
    buildBreadcrumbs: jest.fn(() => ([{
        text: 'HISTORY',
        href: '/'
      },
      {
        text: 'ROT',
        href: '/files/e95b197aef0941e12e970da042afd4c2b1488225/'
      },
      {
        text: 'package.json'
      }
    ])),
  }

  filesController(req, res, next, mocks)
  test('Вывод списка файлов', () => {
    expect(res.render).toBeCalledWith('files', {
      title: 'files',
      breadcrumbs: [{
          text: 'HISTORY',
          href: '/'
        },
        {
          text: 'ROT',
          href: '/files/e95b197aef0941e12e970da042afd4c2b1488225/'
        },
        {
          text: 'package.json'
        }
      ],
      files: [{
          type: 'blob',
          hash: 'd1c7ae5383bae90d4b1d636acfacd5ec7fa0843b',
          path: 'controllers/contentController.js',
          href: '/content/e95b197aef0941e12e970da042afd4c2b1488225/controllers/contentController.js',
          name: 'contentController.js'
        },
        {
          type: 'blob',
          hash: '02fe732137bea2adfb6f650bce92aa0be2f5cd9d',
          path: 'controllers/filesController.js',
          href: '/content/e95b197aef0941e12e970da042afd4c2b1488225/controllers/filesController.js',
          name: 'filesController.js'
        },
        {
          type: 'blob',
          hash: '0e3f100b8db850ebc6ca003312c328f73972cdec',
          path: 'controllers/indexController.js',
          href: '/content/e95b197aef0941e12e970da042afd4c2b1488225/controllers/indexController.js',
          name: 'indexController.js'
        }
      ]
    })
  })
})