const files = require('./files');

module.exports = (app) => {
    files.renderFiles(app);
};