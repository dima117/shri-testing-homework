const GitWorker = require('../utils/git');
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

const attachParams = (item, hash) => ({
  ...item,
  href: buildObjectUrl(hash, item),
  name: item.path.split('/').pop()
});

function filesController(req, res, next) {
  const { hash } = req.params;
  const pathParam = (req.params[0] || '').split('/').filter(Boolean);

  const path = pathParam.length ? pathParam.join('/') + '/' : '';
  const gitWorker = new GitWorker();

  return gitWorker.gitFileTree(hash, path).then(
    list => {
      const files = list.map(item => attachParams(item, hash));

      res.render('files', {
        title: 'files',
        breadcrumbs: buildBreadcrumbs(hash, pathParam.join('/')),
        files
      });
    },
    err => next(err)
  );
};

module.exports = {
  filesController,
  attachParams,
}
