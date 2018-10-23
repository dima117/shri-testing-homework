const { buildObjectUrl, buildBreadcrumbs } = require('./navigation');

const getIndex = (history) => {
  if (!Array.isArray(history)) {
    history = [];
  }

  const path = '';
  const type = 'tree';

  const list = history.map(item => ({
    ...item,
    href: buildObjectUrl(item.hash, { path, type })
  }));

  return {
    title: 'history',
    breadcrumbs: buildBreadcrumbs(),
    list
  };
};

const getFiles = (list, hash, pathParam) => {
  if (!Array.isArray(list)) {
    list = [];
  }

  const files = list.map(item => ({
    ...item,
    href: buildObjectUrl(hash, item),
    name: item.path.split('/').pop()
  }))

  return {
    title: 'files',
    breadcrumbs: buildBreadcrumbs(hash, pathParam.join('/')),
    files
  };
};

const getContent = (content, hash, path) => {
  return {
    title: 'content',
    breadcrumbs: buildBreadcrumbs(hash, path.join('/')),
    content
  }
};

module.exports = {
  getIndex,
  getFiles,
  getContent
};
