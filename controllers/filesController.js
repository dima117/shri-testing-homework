const { gitHelper } = require('../utils/git');
const { generateFiles } = require('../utils/generateData');

module.exports = function(req, res, next) {
  const { hash } = req.params;
  const pathParam = (req.params[0] || '').split('/').filter(Boolean);

  const path = pathParam.length ? pathParam.join('/') + '/' : '';

  return gitHelper.gitFileTree(hash, path).then(
    list => {
      res.render('files', generateFiles(hash, pathParam, list));
    },
    err => next(err)
  );
};
