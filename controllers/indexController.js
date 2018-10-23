const {gitHistory} = require('../utils/git');
const { renderData, buildListData } = require('../utils/prepareData');

module.exports = function (getHistory = gitHistory) {
  return function (req, res, next) {
    buildListData(1, 20, getHistory).then((list) => {
        res.render('index', renderData('history', list));
      }
    ).catch(err => next(err));
  }
}();
