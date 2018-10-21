const {gitFileContent, gitFileTree} = require('../../utils/git');
const {buildBreadcrumbs} = require('../../utils/navigation');
const {executeGit} = require('../../services/git');

function getTree(systemConsole, hash, path) {
  return gitFileTree(systemConsole, hash, path.join('/'))
    .then(([file]) => file);
};

function getContent(systemConsole, file) {
  if (file && file.type === 'blob') {
    return gitFileContent(systemConsole, file.hash);
  }
};

function renderContent(app) {
  app.get('/content/:hash/*?', function (req, res, next) {
    const {hash} = req.params;
    const path = req.params[0].split('/').filter(Boolean);

    getTree(executeGit, hash, path)
      .then((file) => {
        return getContent(executeGit, file);
      })
      .then((content) => {
        res.render('content', {
          title: 'content',
          breadcrumbs: buildBreadcrumbs(hash, path.join('/')),
          content
        });
      }, (err) => next(err));
  })
};

module.exports = {
  getTree,
  getContent,
  renderContent
};