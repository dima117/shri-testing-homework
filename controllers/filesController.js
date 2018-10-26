const Git = require('../utils/git');
const Navigation = require('../utils/navigation');

const git = new Git();
const navigation = new Navigation();

function buildObjectUrl(parentHash, { path, type }) {
    switch (type) {
        case 'tree':
            return navigation.buildFolderUrl(parentHash, path);
        case 'blob':
            return navigation.buildFileUrl(parentHash, path);
        default:
            return '#';
    }
}

module.exports = function (req, res, next) {
    const { hash } = req.params;
    const pathParam = (req.params[0] || '').split('/').filter(Boolean);

    const path = pathParam.length ? pathParam.join('/') + '/' : '';

    return git.gitFileTree(hash, path).then(
        list => {
            const files = list.map(item => ({
                ...item,
                href: buildObjectUrl(hash, item),
                name: item.path.split('/').pop()
            }));

            res.render('files', {
                title: 'files',
                breadcrumbs: navigation.buildBreadcrumbs(hash, pathParam.join('/')),
                files
            });
        },
        err => next(err)
    );
};
