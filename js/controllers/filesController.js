const GitOperations = require('../utils/git');
const { getFiles } = require('../utils/page-content');

module.exports = function (req, res, next) {
  const gitOperations = new GitOperations();

  const { hash } = req.params;
  const pathParam = (req.params[0] || '').split('/').filter(Boolean);

  const path = pathParam.length ? pathParam.join('/') + '/' : '';

  return gitOperations.gitFileTree(hash, path).then(
    list => {
      res.render('files', getFiles(list, hash, pathParam));
    },
    err => next(err)
  );
};
