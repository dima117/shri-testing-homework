const { Git } = require('../utils/git');
const { buildIndexPage } = require('../utils/buildPage');

module.exports = function (req, res) {
  const git = new Git();
  git.getHistory(1, 20).then(
    history => res.render('index', buildIndexPage(history)),
    err => next(err)
  );
};
