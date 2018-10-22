const { gitHistory } = require('../utils/git');
const { buildObjectUrl, buildBreadcrumbs } = require('../utils/navigation');

module.exports = function (req, res, next) {
  const path = '';
  const type = 'tree';

  gitHistory(1, 20).then(
    history => {
      const list = history.map(item => ({
        ...item,
        href: buildObjectUrl(item.hash, { path, type })
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
