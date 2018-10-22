const { UtilGit } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

const utilGit = new UtilGit();

module.exports = function(req, res) {
  utilGit.gitHistory(1, 20).then(
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
