const gitUtil = require('../utils/git');
const navUtil = require('../utils/navigation');

function buildObjectUrl(parentHash, { path, type }) {
  switch (type) {
    case 'tree':
      return navUtil.buildFolderUrl(parentHash, path);
    case 'blob':
      return navUtil.buildFileUrl(parentHash, path);
    default:
      return '#';
  }
}

module.exports = function(req, res, next) {
  const { hash } = req.params;
  const pathParam = (req.params[0] || '').split('/').filter(Boolean);

  const path = pathParam.length ? pathParam.join('/') + '/' : '';

  return gitUtil.gitFileTree(hash, path).then(
    list => {
      const files = list.map(item => ({
        ...item,
        href: buildObjectUrl(hash, item),
        name: item.path.split('/').pop()
      }));

      res.render('files', {
        title: 'files',
        breadcrumbs: navUtil.buildBreadcrumbs(hash, pathParam.join('/')),
        files
      });
    },
    err => next(err)
  );
};
