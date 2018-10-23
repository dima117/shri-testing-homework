const { gitHistoryFactory } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

const gitHistory = gitHistoryFactory();

module.exports = function(getHistory = gitHistory) {
  return function(req, res) {
    getHistory(1, 20).then(
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
};
