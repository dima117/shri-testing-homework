const { gitModule } = require('../utils/git');
const { buildFileUrl, buildBreadcrumbs } = require('../utils/navigation');
const git = new gitModule();

module.exports = function(req, res, next) {
  git.gitHistory(1, 20).then(
    history => {
      const list = history.map(item => ({
        ...item,
        href: buildFileUrl('files',item.hash)
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
