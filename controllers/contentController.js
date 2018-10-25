const {Git} = require('../utils/git');
const {buildBreadcrumbs} = require('../utils/navigation');

module.exports = function(req, res, next) {
  const git = new Git;
  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean);

  git.fileTree(hash, path.join('/'))
    .then(function([file]) {
      if (file && file.type === 'blob') {
        return git.fileContent(file.hash);
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
