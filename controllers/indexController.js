const Git = require('../utils/git');
const { buildObjectUrl, buildBreadcrumbs } = require('../utils/navigation');

const git = new Git();

module.exports = function(req, res, next) {
  git.history(1, 20).then(
    history => {
      const list = history.map(item => ({
        ...item,
        href: buildObjectUrl(item.hash, { path: '', type: 'tree' })
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
