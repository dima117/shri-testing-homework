const { buildBreadcrumbs } = require('./navigation');
const {
  buildFolderUrl,
  buildFileUrl
} = require('../utils/navigation');

function renderData(title, data, hash, path) {
  return {
    title,
    breadcrumbs: buildBreadcrumbs(hash, path),
    data
  }
}

function buildListData(start = 1, end = 20, getHistory) {
  return getHistory(start, end).then((history) => {
    return history.map(item => ({
      ...item,
      href: buildFolderUrl(item.hash, '')
    }));
  })
}

function buildObjectUrl(parentHash, { path, type }) {
  switch (type) {
    case 'tree':
      return buildFolderUrl(parentHash, path);
    case 'blob':
      return buildFileUrl(parentHash, path);
    default:
      return '#';
  }
}

function buildFilesData(hash, path, getFileTree) {
  return getFileTree(hash, path).then(
    list => {
      return list.map(item => ({
        ...item,
        href: buildObjectUrl(hash, item),
        name: item.path.split('/').pop()
      }));
    })
}

module.exports = {
  renderData,
  buildListData,
  buildFilesData,
};
