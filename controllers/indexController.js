const GitWorker = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

const attachHref = gitInfo => ({
  ...gitInfo,
  href: buildFolderUrl(gitInfo.hash, '')
});

function indexController(req, res) {
  const gitWorker = new GitWorker();

  gitWorker.gitHistory(1, 20)
    .then((history) => {
      const list = history.map(attachHref);

      res.render('index', {
        title: 'history',
        breadcrumbs: buildBreadcrumbs(),
        list
      });
    },
    err => next(err));
}

module.exports = {
  indexController,
  attachHref,
};
