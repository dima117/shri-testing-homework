const { Git } = require('../utils/git');
const { buildContentPage } = require('../utils/buildPage');

module.exports = function(req, res, next) {
  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean);

  const git = new Git();
  git.getFileTree(hash, path.join('/'))
    .then(function([file]) {
      if (file && file.type === 'blob') {
        return git.getFileContent(file.hash);
      }
    })
    .then(
      content => {
        if (content) {
          res.render('content', buildContentPage(content, hash, path));
        } else {
          next();
        }
      },
      err => next(err)
    );
};
