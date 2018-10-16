const { gitHistory } = require('../utils/git');

module.exports = function(req, res) {

    gitHistory(1, 20)
        .then(history => {
            res.render('index', { title: 'history', history });
        }, err => next(err));
};