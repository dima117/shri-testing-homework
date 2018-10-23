const { gitFileTree } = require('../utils/git');
const { renderData, buildFilesData } = require('../utils/prepareData');

module.exports = function(getFileTree = gitFileTree) {
  return function (req, res, next) {
    const {hash} = req.params;
    const pathParam = (req.params[0] || '').split('/').filter(Boolean);

    const path = pathParam.length ? pathParam.join('/') + '/' : '';
    const pathFull = pathParam.join('/');

    return buildFilesData(hash, path, getFileTree).then(
      files => {
        res.render('files', renderData('files', files, hash, pathFull));
      }
    ).catch(err => next(err));
  }
};
