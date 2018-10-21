const GitUtils = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

const addParamsToHistoryItem = (item) => ({
  ...item,
  href: buildFolderUrl(item.hash, '')
});

function indexController(req, res) {
  const gitUtils = new GitUtils();

  gitUtils.gitHistory(1, 20).then(
    history => {
      const list = history.map(addParamsToHistoryItem);

      res.render('index', {
        title: 'history',
        breadcrumbs: buildBreadcrumbs(),
        list
      });
    },
    err => next(err)
  );
};

module.exports = {
  indexController,
  addParamsToHistoryItem,
}
