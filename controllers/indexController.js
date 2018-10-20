const { gitHistory } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

class IndexController{
  constructor(){
    this.gitHistory = new gitHistory().run;
    this.run = this.run.bind(this);
  }
  run(req, res) {
  this.gitHistory(1, 20)
  .then(
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
}

module.exports = IndexController;