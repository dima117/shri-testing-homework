const Git = require('../utils/git');
const Navigation = require('../utils/navigation');

let nav = new Navigation();

function buildObjectUrl(parentHash, { path, type }) {
  switch (type) {
    case 'tree':
      return nav.buildFolderUrl(parentHash, path);
    case 'blob':
      return nav.buildFileUrl(parentHash, path);
    default:
      return '#';
  }
}

module.exports = function(req, res, next) {
  const { hash } = req.params;
  const pathParam = (req.params[0] || '').split('/').filter(Boolean);
  const git = new Git();

  const path = pathParam.length ? pathParam.join('/') + '/' : '';

  return git.gitFileTree(hash, path).then(
    list => {
      const files = list.map(item => ({
        ...item,
        href: buildObjectUrl(hash, item),
        name: item.path.split('/').pop()
      }));

      res.render('files', {
        title: 'files',
        breadcrumbs: nav.buildBreadcrumbs(hash, pathParam.join('/')),
        files
      });
    },
    err => next(err)
  );
};
