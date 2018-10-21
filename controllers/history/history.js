const {gitHistory} = require('../../utils/git');
const {buildFolderUrl, buildBreadcrumbs} = require('../../utils/navigation');
const {executeGit} = require('../../services/git');

function getHistory(systemConsole, start, end) {
  return gitHistory(systemConsole, start, end)
    .then((history) => {
      return history.map((item) => ({
        ...item,
        href: buildFolderUrl(item.hash, '')
      }));
    });
};

function renderHistory(app) {
  app.get('/', function (req, res) {
    const [start, end] = [1, 20];

    getHistory(executeGit, start, end)
      .then((list) => {
        res.render('index', {
          title: 'history',
          breadcrumbs: buildBreadcrumbs(),
          list
        });
      }, (err) => next(err));
  });
};

module.exports = {
  getHistory,
  renderHistory
};