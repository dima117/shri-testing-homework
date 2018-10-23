const { gitFileContent, gitFileTree } = require('../utils/git');
const { buildBreadcrumbs } = require('../utils/navigation');

module.exports = function(req, res, next) {
  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean).join('/');

  gitFileTree(hash, path)
    .then(([file]) => {
      return gitFileContent(file.hash);
    })
    .then(
      content => {
        res.render('content', {
          title: 'content',
          breadcrumbs: buildBreadcrumbs(hash, path),
          content
        });
      },
      err => next(err)
    );
};
