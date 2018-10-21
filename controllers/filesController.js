const GitUtils = require('../utils/git');
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

const addParamsToFile = (file, hash) => ({
  ...file,
  href: buildObjectUrl(hash, file),
  name: file.path.split('/').pop()
});

function filesController(req, res, next) {
  const { hash } = req.params;
  const pathParam = (req.params[0] || '').split('/').filter(Boolean);

  const path = pathParam.length ? pathParam.join('/') + '/' : '';
  const gitUtils = new GitUtils();

  return gitUtils.gitFileTree(hash, path).then(
    list => {
      const files = list.map(item => addParamsToFile(item, hash));

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
  addParamsToFile,
}
