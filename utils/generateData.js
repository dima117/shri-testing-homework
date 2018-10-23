const {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs
} = require('./navigation');

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

function generateContent(hash, path, content) {
  return {
    title: 'content',
    breadcrumbs: buildBreadcrumbs(hash, path.join('/')),
    content
  };
}

function generateFiles(hash, pathParam, list) {
  const files = list.map(item => ({
    ...item,
    href: buildObjectUrl(hash, item),
    name: item.path.split('/').pop()
  }));

  return {
    title: 'files',
    breadcrumbs: buildBreadcrumbs(hash, pathParam.join('/')),
    files
  };
}

function generateList(history) {
  const list = history.map(item => ({
    ...item,
    href: buildFolderUrl(item.hash, '')
  }));

  return {
    title: 'history',
    breadcrumbs: buildBreadcrumbs(),
    list
  };
}

module.exports = { 
  generateContent,
  generateFiles,
  generateList, 
  buildObjectUrl
};
