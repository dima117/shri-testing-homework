const {buildBreadcrumbs} = require("../view/buildBreadcrumbs");

const { gitHistory } = require('../api/gitAPI');
const { buildFolderUrl} = require('../utils/navigation');

module.exports = function(req, res) {
  return gitHistory(1, 20).then(
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
