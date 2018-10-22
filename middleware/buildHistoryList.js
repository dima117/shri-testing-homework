const {buildFolderUrl, buildBreadcrumbs} = require('../utils/navigation');

module.exports = function (history) {
    const list = history.map(item => ({
        ...item,
        href: buildFolderUrl(item.hash, '')
    }));

    return {
        title: 'history',
        breadcrumbs: buildBreadcrumbs(),
        list
    };
};