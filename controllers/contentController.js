const { gitFileContent, gitFileTree } = require('../utils/git');
const { renderData } = require('../utils/prepareData');

module.exports = function (getFileTree = gitFileTree, getFileContent = gitFileContent) {
  return function (req, res, next) {
    const {hash} = req.params;
    const path = req.params[0].split('/').filter(Boolean);
    const pathFull = path.join('/');

    return getFileTree(hash, pathFull)
      .then(function ([file]) {
        if (file && file.type === 'blob') {
          return getFileContent(file.hash);
        }
      })
      .then(
        content => {
          if (content) {
            const data = renderData('content', content, hash, pathFull);
            res.render('content', data);
          } else {
            next();
          }
        }
      ).catch(err => next(err));
  };
};
