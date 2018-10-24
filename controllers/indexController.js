const { gitHistory } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

module.exports = function (req, res) {
  this.gitHistory = gitHistory;
  this.buildFolderUrl = buildFolderUrl;

  this.buildList = () => {
    const thisGitHistory = this.gitHistory;
    const thisBuildFolderUrl = this.buildFolderUrl;

    return thisGitHistory(1, 20).then(
      history => {
        return history.map(item => ({
          ...item,
          href: thisBuildFolderUrl(item.hash, '')
        }));
      },
      /**
       * в рамках данного задания не предполагалось исправления существующего кода,
       * только реорганизация, да и исходная задумка автора неизвестна.
       * Потому это неопределённое next оставлю без изменений,
       * хотя по-хорошему его тоже можно было бы протестировать.
       */
      err => next(err)
    );
  }

  this.render = list => {
    if (res) {
      res.render('index', {
        title: 'history',
        breadcrumbs: buildBreadcrumbs(),
        list
      });
    }
  }

  this.buildList().then(list => this.render(list));
};