const GitCommands = require('../utils/git');
const { prepareIndex } = require('../utils/page-preparation');

module.exports = function(req, res) {
  GitCommands.gitHistory(1, 20).then(
    history => {
      res.render('index', prepareIndex(history));
    },
    err => next(err)
  );
};

