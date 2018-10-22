const { UtilGit } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

const utilGit = new UtilGit();


module.exports = function(req, res, next) {
  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean);

  utilGit.gitFileTree(hash, path.join('/'))
    .then(function([file]) {
      if (file && file.type === 'blob') {
        return utilGit.gitFileContent(file.hash);
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