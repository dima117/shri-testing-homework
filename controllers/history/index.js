const history = require('./history');

module.exports = (app) => {
    history.renderHistory(app);
};