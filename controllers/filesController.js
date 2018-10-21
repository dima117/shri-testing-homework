let { gitFileTree } = require('../utils/git');
let {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs,
} = require('../utils/navigation');

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

module.exports = function filesController(req, res, next) {
  // точки расширения
  res.render = filesController._renderFake
    ? filesController._renderFake(res)
    : res.render;

  gitFileTree = filesController._gitFileTreeFake
    ? filesController._gitFileTreeFake
    : gitFileTree;

  buildFolderUrl = filesController._buildFolderUrlFake
    ? filesController._buildFolderUrlFake
    : buildFolderUrl;

  buildFileUrl = filesController._buildFileUrlFake
    ? filesController._buildFileUrlFake
    : buildFolderUrl;

  buildBreadcrumbs = filesController._buildBreadcrumbsFake
    ? filesController._buildBreadcrumbsFake
    : buildBreadcrumbs;

  const { hash } = req.params;
  const pathParam = (req.params[0] || '').split('/').filter(Boolean);

  const path = pathParam.length ? `${pathParam.join('/')}/` : '';

  return gitFileTree(hash, path).then(
    (list) => {
      const files = list.map(item => ({
        ...item,
        href: buildObjectUrl(hash, item),
        name: item.path.split('/').pop(),
      }));

      res.render('files', {
        title: 'files',
        breadcrumbs: buildBreadcrumbs(hash, pathParam.join('/')),
        files,
      });
    },
    err => next(err),
  );
};
