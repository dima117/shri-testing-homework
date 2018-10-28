const Git = require('../utils/git');
const Navigation = require('../utils/navigation');

const git = new Git();
const navigation = new Navigation();

module.exports = function (req, res, next) {
    const { hash } = req.params;
    const path = req.params[0].split('/').filter(Boolean);

    git.gitFileTree(hash, path.join('/'))
        .then(function ([file]) {
            if (file && file.type === 'blob') {
                return git.gitFileContent(file.hash);
            }
        })
        .then(
            content => {
                if (content) {
                    res.render('content', {
                        title: 'content',
                        breadcrumbs: navigation.buildBreadcrumbs(hash, path.join('/')),
                        content
                    });
                } else {
                    next();
                }
            },
            err => next(err)
        );
};
