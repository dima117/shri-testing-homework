const { Git } = require('../utils/git');
const { buildFilesPage } = require('../utils/buildPage');

module.exports = function(req, res, next) {
  const { hash } = req.params;
  const pathParam = (req.params[0] || '').split('/').filter(Boolean);

  const path = pathParam.length ? pathParam.join('/') + '/' : '';

  const git = new Git();
  return git.getFileTree(hash, path).then(
    list => res.render('files', buildFilesPage(list, hash, pathParam)),
    err => next(err)
  );
};
