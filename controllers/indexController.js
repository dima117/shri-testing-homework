const Utils = require('../utils/git');
const { buildFolderUrl, buildBreadcrumbs } = require('../utils/navigation');

function interProcessor(history, res) {
    const list = history.map(item => ({
        ...item,
        href: buildFolderUrl(item.hash, '')
    }));

    res.render('index', {
        title: 'history',
        breadcrumbs: buildBreadcrumbs(),
        list
    });
}

module.exports.interProcessor = interProcessor;
module.exports.router = function(req, res, next) {
    Utils.gitHistory(1, 20)
        .then(history => interProcessor(history, res))
        .catch(next);
};
