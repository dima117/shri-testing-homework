const historyController = require('./history');
const contentController = require('./content');
const filesController = require('./files');

module.exports = (app)  => {
    historyController(app);
    contentController(app);
    filesController(app);
};