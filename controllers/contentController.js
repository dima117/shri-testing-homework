const {gitFileContent, gitFileTree} = require('../utils/git');
const {renderData} = require('../utils/prepareData');

module.exports = function (getFileTree = gitFileTree) {
  return function (req, res, next) {
    const {hash} = req.params;
    const path = req.params[0].split('/').filter(Boolean);
    const pathFull = path.join('/');

    getFileTree(hash, path.join('/'))
      .then(function ([file]) {
        if (file && file.type === 'blob') {
          return gitFileContent(file.hash);
        }
      })
      .then(
        content => {
          if (content) {
            res.render('content', renderData('content', content, hash, pathFull));
          } else {
            next();
          }
        }
      ).catch(err => next(err));
  };
}();

