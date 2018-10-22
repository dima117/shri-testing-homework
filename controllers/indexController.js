const { UtilGit } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

const utilGit = new UtilGit();

function insideProc(history, res) {
  const list = history.map(item => ({
    ...item,
    href: buildFolderUrl(item.hash, '')
  }));

  res.render('index', {
    title: 'history',
    breadcrumbs: buildBreadcrumbs(),
    list
  });
}

module.exports.insideProc = insideProc;
module.exports.rout = function(req, res) {
  utilGit.gitHistory(1, 20)
  .then(
    history => insideProc(history, res),
    err => next(err)
  );
};
