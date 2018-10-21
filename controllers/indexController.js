const { GitClass } = require('../utils/git');
const { NavigationClass } = require('../utils/navigation');

indexControllerFunction =  function(req, res) {
  let git = new GitClass();
  let navigation = new NavigationClass();

  git.gitHistory(1, 30).then( // changed 20 -> 30 to make integration screenshot tests easier
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

module.exports = indexControllerFunction;