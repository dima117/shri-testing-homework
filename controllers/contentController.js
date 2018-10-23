const {GitMethods} = require('../utils/git');
const {buildBreadcrumbs} = require('../utils/navigation');
const git = new GitMethods();

module.exports = function (req, res, next) {
    const {hash} = req.params;
    const path = req.params[0].split('/').filter(Boolean);

    git.gitFileTree(hash, path.join('/'))
        .then(([file]) => {
            if (file && file.type === 'blob') {
                return git.gitFileContent(file.hash);
            }
        })
        .then(
            (content) => {
                if (content) {
                    res.render('content', {
                        title: 'content',
                        breadcrumbs: buildBreadcrumbs(hash, path.join('/')),
                        content
                    });
                } else {
                    next();
                }
            },
            (err) => next(err)
        );
};
