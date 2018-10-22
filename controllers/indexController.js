const GitUtil = require('../utils/git');
const git = new GitUtil();
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

module.exports = async function(req, res, next) {
  await git.gitHistory(1, 20).then(
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
