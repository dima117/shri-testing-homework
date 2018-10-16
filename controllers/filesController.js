const { gitFileTree } = require('../utils/git');
const { buildFolderUrl, buildFileUrl } = require('../utils/navigation');

function buildObjectUrl(parentHash, {path, type}) {
    switch (type) {
        case 'tree':
            return buildFolderUrl(parentHash, path);
        case 'blob':
            return buildFileUrl(parentHash, path);
        default:
            return '#';
    }
}

module.exports = function(req, res, next) {
    const { hash } = req.params;
    const pathParam = (req.params[0] || '').split('/').filter(Boolean);

    const path = pathParam.length ? pathParam.join('/') + '/' : '';
        .then(list => {
            const files = list.map(item => ({ 
                ...item, 
                href: buildObjectUrl(hash, item),
                name: item.path.split('/').pop()
            }));

            res.render('files', { title: 'files', files });
        }, err => next(err));
};