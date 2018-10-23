const { gitHistory } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');


module.exports = function(req, res, next, stubs) {

  const getHistory = stubs.getFakeHistory || gitHistory;
  const getFolderUrl = stubs.getFakeFolderUrl || buildFolderUrl;
  const getBreadcrumbs = stubs.getFakeBreadcrumbs || buildBreadcrumbs;


  return getHistory(1, 20)
    .then(
    history => {
      const list = history.map(item => ({
        ...item,
        href: getFolderUrl(item.hash, '')
      }));


      res.render('index', {
        title: 'history',
        breadcrumbs: getBreadcrumbs(),
        list
      });
    },
    err => next(err)
  );
};
