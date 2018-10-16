const { Git } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

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
