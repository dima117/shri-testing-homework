const { GitClass } = require('../utils/git');
const { NavigationClass } = require('../utils/navigation');

module.exports = function(req, res) {
  let git = new GitClass();
  let navigation = new NavigationClass();

  git.gitHistory(1, 20).then(
    history => {
      const list = history.map(item => ({
        ...item,
        href: navigation.buildFolderUrl(item.hash, '')
      }));

      res.render('index', {
        title: 'history',
        breadcrumbs: navigation.buildBreadcrumbs(),
        list
      });
    },
    err => next(err)
  );
};
