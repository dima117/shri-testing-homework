const { Git } = require('../utils/Git');
let git = new Git();
let buildHistory = require('../middleware/buildHistoryList');

module.exports = function(req, res) {
  git.gitHistory(1, 20).then(
    history => {
      res.render('index', buildHistory(history));
    },
    err => next(err)
  );
};
