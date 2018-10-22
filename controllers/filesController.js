const { UtilGit } = require('../utils/git');
const {
  buildFolderUrl,
  buildFileUrl,
  buildBreadcrumbs
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

function insideProc(list, hash, pathParam, res) {
  const files = list.map(item => ({
    ...item,
    href: buildObjectUrl(hash, item),
    name: item.path.split('/').pop()
  }));

  res.render('files', {
    title: 'files',
    breadcrumbs: buildBreadcrumbs(hash, pathParam.join('/')),
    files
  });
}

const utilGit = new UtilGit();

module.exports.insideProc = insideProc;
module.exports.rout = function(req, res, next) {
  const { hash } = req.params;
  const pathParam = (req.params[0] || '').split('/').filter(Boolean);

  const path = pathParam.length ? pathParam.join('/') + '/' : '';

  return utilGit.gitFileTree(hash, path)
        .then(
          list => insideProc(list, hash, pathParam, res),
          err => next(err)
        );
};