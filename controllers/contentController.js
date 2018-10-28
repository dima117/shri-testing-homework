const GitWorker = require('../utils/git');
const UrlBuilder = require('../utils/navigation');

const buildBreadcrumbs = new UrlBuilder().buildBreadcrumbs;

module.exports = function(req, res, next) {
  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean);
  const gitWorker = new GitWorker();

  gitWorker.gitFileTree(hash, path.join('/'))
    .then(function([file]) {
      if (file && file.type === 'blob') {
        return gitWorker.gitFileContent(file.hash);
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
