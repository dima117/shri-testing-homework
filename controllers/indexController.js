const { gitHistory } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

module.exports = class IndexConroller {
  constructor(stubs = {}){
    this.stubs = stubs;
  }

  run(req, res, next) {

    const getHistory = this.stubs.getFakeHistory || gitHistory;
    const getFolderUrl = this.stubs.getFakeFolderUrl || buildFolderUrl;
    const getBreadcrumbs = this.stubs.getFakeBreadcrumbs || buildBreadcrumbs;


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
  }
}
