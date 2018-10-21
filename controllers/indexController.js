const { Git } = require('../utils/git');
const git = new Git();
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

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
