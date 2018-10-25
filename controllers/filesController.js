const GitCommands = require('../utils/git');
const { prepareFiles } = require('../utils/page-preparation');

module.exports = function(req, res, next) {
  const { hash } = req.params;
  const pathParam = (req.params[0] || '').split('/').filter(Boolean);
  const path = pathParam.length ? pathParam.join('/') + '/' : '';

  return GitCommands.gitFileTree(hash, path).then(
    list => {
      res.render('files', prepareFiles(list, hash, pathParam));
    },
    err => next(err)
  );
};
