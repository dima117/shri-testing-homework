const {GitMethods} = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');
const git = new GitMethods();
module.exports = function(req, res) {
  git.gitHistory(1, 20).then(
    history => {
      const list = history.map(item => ({
        ...item,
        href: buildFolderUrl(item.hash, '')
      }));

      res.render('index', {
        title: 'history',
        breadcrumbs: buildBreadcrumbs(),
        list
      });
    },
    err => next(err)
  );
};
