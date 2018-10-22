let { gitFileContent, gitFileTree } = require('../utils/git');
let { buildBreadcrumbs } = require('../utils/navigation');

module.exports = function contentController(req, res, next) {
  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean);

  // точки расширения
  res.render = contentController._renderFake
    ? contentController._renderFake(res)
    : res.render;

  gitFileTree = contentController._gitFileTreeFake
    ? contentController._gitFileTreeFake
    : gitFileTree;

  gitFileContent = contentController._gitFileContentFake
    ? contentController._gitFileContentFake
    : gitFileContent;

  buildBreadcrumbs = contentController._buildBreadcrumbsFake
    ? contentController._buildBreadcrumbsFake
    : buildBreadcrumbs;

  gitFileTree(hash, path.join('/'))
    .then(([file]) => {
      if (file && file.type === 'blob') {
        return gitFileContent(file.hash);
      }
      return false;
    })
    .then(
      (content) => {
        if (content) {
          res.render('content', {
            title: 'content',
            breadcrumbs: buildBreadcrumbs(hash, path.join('/')),
            content,
          });
        } else {
          next();
        }
      },
      err => next(err),
    );
};
