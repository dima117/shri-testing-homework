const Utils = require('../utils/git');
const { buildBreadcrumbs } = require('../utils/navigation');

function interProcessor(content, res, hash, path, next) {
    if (content) {
        res.render('content', {
            title: 'content',
            breadcrumbs: buildBreadcrumbs(hash, path.join('/')),
            content
        });
    } else {
        next();
    }
    return { path, hash };
}

module.exports.interProcessor = interProcessor;
module.exports.router = function(req, res, next) {
    const { hash } = req.params;
    const path = req.params[0].split('/').filter(Boolean);

    return Utils.gitFileTree(hash, path.join('/'))
        .then(function([file]) {
            if (file.type === 'blob') {
                return Utils.gitFileContent(file.hash);
            }
        })
        .then(
            content => interProcessor(content, res, hash, path,),
            err => next(err)
        );
};
