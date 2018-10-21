const gitUtil = require('../utils/git');
const navUtil = require('../utils/navigation');

module.exports = function(req, res) {
  gitUtil.gitHistory(1, 20).then(
    history => {
      const list = history.map(item => ({
        ...item,
        href: navUtil.buildFolderUrl(item.hash, '')
      }));

      res.render('index', {
        title: 'history',
        breadcrumbs: navUtil.buildBreadcrumbs(),
        list
      });
    },
    err => next(err)
  );
};
