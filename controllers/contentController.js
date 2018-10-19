const { Git } = require('../utils/Git');
const buildFileContent = require('../middleware/buildFileContent');
let git = new Git();

module.exports = function(req, res, next) {
  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean);

  git.gitFileTree(hash, path.join('/'))
    .then(function([file]) {
      if (file && file.type === 'blob') {
        return git.gitFileContent(file.hash);
      }
    })
    .then(
      content => {
        if (content) {
          res.render('content', buildFileContent(content, hash, path));
        } else {
          next();
        }
      },
      err => next(err)
    );
};
