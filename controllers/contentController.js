const { git } = require('../utils/git');
const { navigation } = require('../utils/navigation');

module.exports = function (req, res, next) {
  const { hash } = req.params;
  const path = req.params[0].split('/')
    .filter(Boolean);

  git.gitFileTree(hash, path.join('/'))
    .then(([file]) => {
      if (file && file.type === 'blob') {
        return git.gitFileContent(file.hash);
      }
    })
    .then(
      (content) => {
        if (content) {
          res.render('content', {
            title: 'content',
            breadcrumbs: navigation.buildBreadcrumbs(hash, path.join('/')),
            content,
          });
        } else {
          next();
        }
      },
      err => next(err),
    );
};
