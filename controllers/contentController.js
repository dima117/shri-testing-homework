// const { gitFileContent, gitFileTree } = require('../utils/git');
const { GitClass } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');
const git = new GitClass();

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
          res.render('content', {
            title: 'content',
            breadcrumbs: buildBreadcrumbs(hash, path.join('/')),
            content
          });
        } else {
          next();
        }
      },
      err => next(err)
    );
};
