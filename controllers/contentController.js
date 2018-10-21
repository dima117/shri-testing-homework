const { GitClass } = require('../utils/git');
const { NavigationClass } = require('../utils/navigation');

contentControllerFunction = function(req, res, next) {
  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean);
  let git = new GitClass();
  let navigation = new NavigationClass();

  git.gitFileTree(hash, path.join('/'))
    .then(function([file]) {
      if (file && file.type === 'blob') {
        return git.gitFileContent(file.hash);
      }
    })
    .then(
      content => {
        if (content) {
          const result = { title: 'content',
            breadcrumbs: navigation.buildBreadcrumbs(hash, path.join('/')),
            content
          };
          
          res.render('content', result);
        } else {
          next();
        }
      },
      err => next(err)
    );
};

module.exports = contentControllerFunction;