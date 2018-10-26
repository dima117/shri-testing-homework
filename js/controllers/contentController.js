const GitOperations = require('../utils/git');
const { getContent } = require('../utils/page-content');

module.exports = function (req, res, next) {
  const gitOperations = new GitOperations();

  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean);

  gitOperations.gitFileTree(hash, path.join('/'))
    .then(function ([file]) {
      if (file && file.type === 'blob') {
        return gitOperations.gitFileContent(file.hash);
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
