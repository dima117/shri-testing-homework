const Utils = require('../utils/git');

const {
    buildFolderUrl,
    buildFileUrl,
    buildBreadcrumbs
} = require('../utils/navigation');

function buildObjectUrl(parentHash, { path, type }) {
    switch (type) {
    case 'tree':
        return buildFolderUrl(parentHash, path);
    case 'blob':
        return buildFileUrl(parentHash, path);
    default:
        return '#';
    }
}

function interProcessor(list, res, hash, pathParam) {
    const files = list.map(item => ({
        ...item,
        href: buildObjectUrl(hash, item),
        name: item.path.split('/').pop()
    }));

    res.render('files', {
        title: 'files',
        breadcrumbs: buildBreadcrumbs(hash, pathParam.join('/')),
        files
    });
}

module.exports.interProcessor = interProcessor;
module.exports.router = function(req, res, next) {
    const { hash } = req.params;
    const pathParam = (req.params[0] || '').split('/').filter(Boolean);

    const path = pathParam.length ? pathParam.join('/') + '/' : '';

    return Utils.gitFileTree(hash, path).then(
        list => { 
            interProcessor(list, res, hash, pathParam); 
        },
        err => next(err)
    );
};
