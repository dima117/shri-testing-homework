const { gitFileContent, gitFileTree } = require('../utils/git');
const { renderData } = require('../utils/prepareData');

module.exports = function (getFileTree = gitFileTree, getFileContent = gitFileContent) {
  return function (req, res, next) {
    const {hash} = req.params;
    const path = req.params[0].split('/').filter(Boolean);
    const pathFull = path.join('/');

    getFileTree(hash, pathFull)
      .then(function ([file]) {
        if (file && file.type === 'blob') {
          return getFileContent(file.hash);
        }
      })
      .then(
        content => {
          if (content) {
            console.log('content true')
            const data = renderData('content', content, hash, pathFull);
            res.render('content', data);
          } else {
            console.log('content false')
            next();
          }
        }
      ).catch(err => next(err));
  };
};
