const indexUrl = 'http://localhost:3000';
const contentUrlParts = ['http://localhost:3000', 'content', '39552053cd9922a91a7fe18ddc61aab644b45922', 'bar', 'bar.txt'];
const fileUrlParts = ['http://localhost:3000', 'files', '39552053cd9922a91a7fe18ddc61aab644b45922', 'bar', 'bar.txt'];

const commitData = [
  {
    author: 'Dmitry Volovod',
    datetime: '2018-10-26 02:02:49 +0300',
    message: 'change file foo/foo.txt',
    hash: '39552053cd9922a91a7fe18ddc61aab644b45922'
  },
  {
    author: 'Dmitry Volovod',
    datetime: '2018-10-26 01:52:18 +0300',
    message: 'add foo directory',
    hash: 'f36d6816424676f524a245a3b732a607baf8d3c1'
  },
  {
    author: 'Dmitry Volovod',
    datetime: '2018-10-26 01:51:45 +0300',
    message: 'add bar directory',
    hash: 'd647965bee4e55b44f81cf3db76a74242988e0a9'
  },
  {
    author: 'Dmitry Volovod',
    datetime: '2018-10-26 01:07:54 +0300',
    message: 'init commit',
    hash: 'ed232db6f03980bd4961dca188a16d195f7a98bd'
  }
];

module.exports = {
  indexUrl,
  contentUrlParts,
  fileUrlParts,
  commitData
};
