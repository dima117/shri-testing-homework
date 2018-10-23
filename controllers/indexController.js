const { gitHelper } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');
const { generateList } = require('../utils/generateData');

module.exports = function(req, res) {
  gitHelper.gitHistory(1, 30).then(
    history => {
      res.render('index', generateList(history));
    },
    err => next(err)
  );
};
