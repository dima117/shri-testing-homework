const { gitFileContent, gitFileTree } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

module.exports = function(req, res, next, thisGitFileContent, thisBuildBreadcrumbs) {
  const { hash } = req ? req.params : '';
  const path = req ? req.params[0].split('/').filter(Boolean) : '';

  thisGitFileContent = thisGitFileContent || gitFileContent;
  thisBuildBreadcrumbs = thisBuildBreadcrumbs || buildBreadcrumbs;

  this.buildRenderData = (hash, path) => {
    path = path ? path.join('/') : '';
    return new Promise ((res, rej) => {
      gitFileTree(hash, path)
      .then(function([file]) {
        if (file && file.type === 'blob') {
          return thisGitFileContent(file.hash);
        }
      })
      .then(content => {
          res({
            title: 'content',
            breadcrumbs: thisBuildBreadcrumbs(hash, path),
            content
          });
        }
      );
    });
  }

  this.buildRenderData(hash, path).then(data => {
    if (data) {
      res.render('content', data);
    } else {
      next();
    }
  },
  err => next(err))

};
