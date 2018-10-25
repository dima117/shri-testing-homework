module.exports = {
  parseFileTreeItemMock: '100644 blob ead09676a936eb50ed700dad0d280d65c3df21d8	README.md',
  parseHistoryItemMock: '90180910fc27a11272a3e5caeeb119a51e5c0545	Dmitry Andriyanov	2018-10-16 12:49:56+0300	исправлена опечатка в readme',
  buildFolderUrlMock: ['hash', 'path'],
  buildFileUrlMock: ['parentHash', 'path'],
  buildObjectDefaultUrlMock: ['parentHash', { path: 'path', type: 'blobbbb' }],
  buildObjectBlobUrlMock: ['parentHash', { path: 'path', type: 'blob' }],
  hashMock:'90180910fc27a11272a3e5caeeb119a51e5c0545',
  pathMock: 'controllers/filesController.js',
  gitHistoryResultMock: [
    { hash: '90180910fc27a11272a3e5caeeb119a51e5c0545',
      author: 'Dmitry Andriyanov',
      timestamp: '2018-10-16 12:49:56 +0300',
      msg: 'исправлена опечатка в readme' },
    { hash: 'cc2284293758e32c50fa952da2f487c8c5e8d023',
      author: 'Dmitry Andriyanov',
      timestamp: '2018-10-16 12:36:32 +0300',
      msg: 'readme' },
  ],
  gitHistoryMock: `90180910fc27a11272a3e5caeeb119a51e5c0545	Dmitry Andriyanov	2018-10-16 12:49:56 +0300	исправлена опечатка в readme
cc2284293758e32c50fa952da2f487c8c5e8d023	Dmitry Andriyanov	2018-10-16 12:36:32 +0300	readme`,
  gitFileTreeMock: `100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8	.gitignore
100644 blob 27e5864fa4f9a15d22ef81a804ca339fa4befbcd	README.md`,
  gitFileTreeResultMock: [
    { type: 'blob',
      hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
      path: '.gitignore' },
    { type: 'blob',
      hash: '27e5864fa4f9a15d22ef81a804ca339fa4befbcd',
      path: 'README.md' }
  ]
};
