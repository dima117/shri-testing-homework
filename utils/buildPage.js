const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('./navigation');

function buildIndexPage(history) {
  const list = history.map(item => ({
    ...item,
    href: buildFolderUrl(item.hash, '')
  }));

  return {
    title: 'history',
    breadcrumbs: buildBreadcrumbs(),
    list
  };
};

function buildFilesPage(list, hash, pathParam) {
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
};

function buildContentPage(content, hash, path) {
  if (content) {
    return {
      title: 'content',
      breadcrumbs: buildBreadcrumbs(hash, path.join('/')),
      content
    };
  } else {
    next();
  }
};

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

module.exports = {
  buildIndexPage,
  buildFilesPage,
  buildContentPage
};
