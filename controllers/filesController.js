const { Git } = require('../utils/Git');
const { buildBreadcrumbs } = require('../utils/navigation');
let { buildFileList } = require('../middleware/buildFileList');
let git = new Git();

module.exports = function(req, res, next) {
  const { hash } = req.params;
  const pathParam = (req.params[0] || '').split('/').filter(Boolean);
  const path = pathParam.length ? pathParam.join('/') + '/' : '';

  return git.gitFileTree(hash, path).then(
    list => {
      res.render('files', {
        title: 'files',
        breadcrumbs: buildBreadcrumbs(hash, pathParam.join('/')),
        files: buildFileList(hash, list)
      });
    },
    err => next(err)
  );
};
