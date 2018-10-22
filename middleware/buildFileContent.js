let { buildBreadcrumbs } = require('../utils/navigation');

module.exports = buildFileContent = (content, hash, path) => {
    return {
        title: 'content',
        breadcrumbs: buildBreadcrumbs(hash, path.join('/')),
        content
    }
};