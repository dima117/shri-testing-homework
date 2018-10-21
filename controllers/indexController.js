let { gitHistory } = require('../utils/git');
let { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

module.exports = function indexController(req, res, next) {
  // точки расширения
  res.render = indexController._renderFake
    ? indexController._renderFake(res)
    : res.render;

  buildFolderUrl = indexController._buildFolderUrlFake
    ? indexController._buildFolderUrlFake
    : buildFolderUrl;

  buildBreadcrumbs = indexController._buildBreadcrumbsFake
    ? indexController._buildBreadcrumbsFake
    : buildBreadcrumbs;

  gitHistory = indexController._gitHistoryFake
    ? indexController._gitHistoryFake
    : gitHistory;

  gitHistory(1, 20).then(
    (history) => {
      const list = history.map(item => ({
        ...item,
        href: buildFolderUrl(item.hash, ''),
      }));

      res.render('index', {
        title: 'history',
        breadcrumbs: buildBreadcrumbs(),
        list,
      });
    },
    err => next(err),
  );
};
