const { gitFileContent, gitFileTree } = require('../utils/git');
const { getBreadcrumbs } = require('../utils/navigation');

module.exports = function(req, res, next) {
  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean);

  gitFileTree(hash, path.join('/')).then(function([file]) {
    if (file && file.type === 'blob') {
      return gitFileContent(file.hash);
    }
  }).then(
      content => {
        if (content) {
          res.render('content', {
            title: 'content',
            breadcrumbs: getBreadcrumbs(hash, path),
            content
          });
        } else {
          next();
        }
      },
      err => next(err)
  );
};
