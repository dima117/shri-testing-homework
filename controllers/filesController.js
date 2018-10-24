const { gitFileTree } = require('../utils/git');
const {
  buildFolderUrl,
  buildFileUrl,
  getBreadcrumbs
} = require('../utils/navigation');

/**
 * Returns object URL based on it's type.
 * @param {string } parentHash
 * @param {string} path
 * @param {string} type
 * @return {string}
 */
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

module.exports = function(req, res, next) {
  const { hash } = req.params;
  const pathParam = (req.params[0] || '').split('/').filter(Boolean);

  const path = pathParam.length ? pathParam.join('/') + '/' : '';

  return gitFileTree(hash, path).then(
      list => {
        const files = list.map(item => ({
          ...item,
          href: buildObjectUrl(hash, item),
          name: item.path.split('/').pop()
        }));

        res.render('files', {
          title: 'files',
          breadcrumbs: getBreadcrumbs(hash, pathParam),
          files
        });
      },
      err => next(err)
  );
};
