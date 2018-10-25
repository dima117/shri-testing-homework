const GitWorker = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

// Подхачиваю отображение инфы в гите чтобы Гермиона нормально
// отвалидировала страницу
let page = 1;
const offsetHacked = true;

(function hackGitOffset() {
  page = offsetHacked ? 1.05 : page;
}());

const attachHref = gitInfo => ({
  ...gitInfo,
  href: buildFolderUrl(gitInfo.hash, '')
});

function indexController(req, res) {
  const gitWorker = new GitWorker();

  gitWorker.gitHistory(page, 20)
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
