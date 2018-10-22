const { gitHistory } = require('../utils/git');
const { getIndex } = require('../utils/page-content');

module.exports = function (req, res, next) {
  gitHistory(1, 3).then(
    history => {
      res.render('index', getIndex(history));
    },
    err => next(err)
  );
};
