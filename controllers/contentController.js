const Utils = require('../utils/git');
const { buildBreadcrumbs } = require('../utils/navigation');

function interProcessor(content, res, hash, path) {
    if (content) {
        res.render('content', {
            title: 'content',
            breadcrumbs: buildBreadcrumbs(hash, path.join('/')),
            content
        });
    } else {
        const err = new Error('Not correct content');
        err.status = 400;
        throw err;
    }
}

module.exports = {
    router: function(req, res, next) {
        const { hash } = req.params;
        const path = req.params[0].split('/').filter(Boolean);

        return Utils.gitFileTree(hash, path.join('/'))
            .then(function([file]) {
                if (file && file.type === 'blob') {
                    // Show file content
                    return Utils.executeGit(['show', file.hash]);
                }
            })
            .then(content => interProcessor(content, res, hash, path))
            .catch(next);
    },
    interProcessor
}
