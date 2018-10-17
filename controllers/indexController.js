const {buildBreadcrumbs} = require("../view/buildBreadcrumbs");

const { gitHistory } = require('../utils/git');
const { buildFolderUrl} = require('../utils/navigation');

module.exports = function(req, res) {
  gitHistory(1, 20).then(
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
