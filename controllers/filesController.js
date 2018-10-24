const { gitFileTree } = require('../utils/git');
const {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs
} = require('../utils/navigation');

/* istanbul ignore next */
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

module.exports = async function(req, res, next, ...stubs) {
  const _stubs = (stubs && stubs[0]) || {};
  const _gitFileTree = _stubs.gitFileTree || gitFileTree;
  const _buildObjectUrl = _stubs.buildObjectUrl || buildObjectUrl;
  const _buildBreadcrumbs = _stubs.buildBreadcrumbs || buildBreadcrumbs;

  const { hash } = req.params;
  const pathParam = (req.params[0] || '').split('/').filter(Boolean);

  const path = pathParam.length ? pathParam.join('/') + '/' : '';

  const files = await _gitFileTree(hash, path).then(
    list => {
      return list.map(item => ({
        ...item,
        href: _buildObjectUrl(hash, item),
        name: item.path.split('/').pop()
      }));
    },
    /* istanbul ignore next */
    err => next(err)
  );

  res.render('files', {
    title: 'files',
    breadcrumbs: _buildBreadcrumbs(hash, pathParam.join('/')),
    files
  });
};
