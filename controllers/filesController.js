const { GitClass } = require('../utils/git');
const { NavigationClass } = require('../utils/navigation');

function buildObjectUrl(parentHash, { path, type }) {
  let navigation = new NavigationClass();

  switch (type) {
    case 'tree':
      return navigation.buildFolderUrl(parentHash, path);
    case 'blob':
      return navigation.buildFileUrl(parentHash, path);
    default:
      return '#';
  }
}

filesControllerFunction = function(req, res, next) {
  let navigation = new NavigationClass();

  const { hash } = req.params;
  const pathParam = (req.params[0] || '').split('/').filter(Boolean);
  let git = new GitClass();

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
        breadcrumbs: navigation.buildBreadcrumbs(hash, pathParam.join('/')),
        files
      });
    },
    err => next(err)
  );
};

module.exports = filesControllerFunction;