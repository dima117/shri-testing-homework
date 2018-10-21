const {gitFileTree} = require('../../utils/git');
const {buildFolderUrl, buildFileUrl, buildBreadcrumbs} = require('../../utils/navigation');
const {executeGit} = require('../../services/git');

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

function getFiles(systemConsole, hash, path) {
  return gitFileTree(systemConsole, hash, path)
    .then((list) => {
      return list.map((item) => ({
        ...item,
        href: buildObjectUrl(hash, item),
        name: item.path.split('/').pop()
      }));
    });
};

function renderFiles(app) {
  app.get('/files/:hash/*?', function(req, res, next) {
    const {hash} = req.params;
    const pathParam = (req.params[0] || '').split('/').filter(Boolean);
    const path = pathParam.length ? pathParam.join('/') + '/' : '';

    getFiles(executeGit, hash, path).then((files) => {
      res.render('files', {
        title: 'files',
        breadcrumbs: buildBreadcrumbs(hash, pathParam.join('/')),
        files
      });
    }, (err) => next(err));
  });
};

module.exports = {
  getFiles,
  renderFiles
};