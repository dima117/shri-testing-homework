const { gitHistory } = require('../utils/git');
const { buildObjectUrl, buildBreadcrumbs } = require('../utils/navigation');

module.exports = function (req, res) {
  gitHistory(1, 20).then(
    history => {
      const list = history.map(item => ({
        ...item,
        href: buildObjectUrl(item.hash, { type: 'tree' })
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
