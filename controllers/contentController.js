const { gitFileContent, gitFileTree } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

module.exports = function(req, res, next) {
  const { hash } = req ? req.params : '';
  const path = req ? req.params[0].split('/').filter(Boolean) : '';

  this.gitFileTree = gitFileTree;
  this.gitFileContent = gitFileContent;
  this.buildBreadcrumbs = buildBreadcrumbs;

  this.buildRenderData = (hash, path) => {
    path = path ? path.join('/') : '';

    return new Promise ((res, rej) => {
      this.gitFileTree(hash, path)
        .then(([file]) => {
          if (file && file.type === 'blob') {
            return this.gitFileContent(file.hash);
          }
        })
        .then(content => {
          res({
            title: 'content',
            breadcrumbs: this.buildBreadcrumbs(hash, path),
            content
          });
        }
        );
    });
  };

  if (req && res) {
    this.buildRenderData(hash, path).then(data => {
      if (data && res) {
        res.render('content', data);
      } else {
        next();
      }
    },
    err => next(err));
  }

};
