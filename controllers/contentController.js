const { gitFileContent, gitFileTree } = require('../utils/git');
const { getContent } = require('../utils/page-content');

module.exports = function (req, res, next) {
  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean);

  gitFileTree(hash, path.join('/'))
    .then(function ([file]) {
      if (file && file.type === 'blob') {
        return gitFileContent(file.hash);
      }
    })
    .then(
      content => {
        if (content) {
          res.render('content', getContent(content, hash, path));
        } else {
          next();
        }
      },
      err => next(err)
    );
};
