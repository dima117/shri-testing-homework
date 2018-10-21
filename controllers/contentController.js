const { gitFileContent, gitFileTree } = require('../utils/git');
const { buildBreadcrumbs } = require('../utils/navigation');

module.exports = async function(req, res, next) {
  const { hash } = req.params;
  const path = req.params[0].split('/').filter(Boolean);

  await gitFileTree(hash, path.join('/'))
    .then(function([file]) {
      if (file && file.type === 'blob') {
        return gitFileContent(file.hash);
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
