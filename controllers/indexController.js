const Git = require('../utils/git');
const Navigation = require('../utils/navigation');

module.exports = function(req, res) {
  const git = new Git();
  const nav = new Navigation();

  git.gitHistory(1, 20).then(
    history => {
      const list = history.map(item => ({
        ...item,
        href: nav.buildFolderUrl(item.hash, '')
      }));

      res.render('index', {
        title: 'history',
        breadcrumbs: nav.buildBreadcrumbs(),
        list
      });
    },
    err => next(err)
  );
};
