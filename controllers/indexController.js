const { gitHistory } = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');
const { generateList } = require('../utils/generateData');

module.exports = function(req, res) {
  gitHistory(1, 20).then(
    history => {
      res.render('index', generateList(history));
    },
    err => next(err)
  );
};
