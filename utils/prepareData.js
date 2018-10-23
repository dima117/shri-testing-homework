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

function buildListData(start, end, getHistory) {
  return getHistory(start, end).then((history) => {
    const list = history.map(item => ({
      ...item,
      href: buildFolderUrl(item.hash, '')
    }));

    return list
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
      const files = list.map(item => ({
        ...item,
        href: buildObjectUrl(hash, item),
        name: item.path.split('/').pop()
      }));

      return files
    })
}


module.exports = {
  renderData,
  buildListData,
  buildFilesData,
};
