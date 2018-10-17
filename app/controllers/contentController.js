const {buildBreadcrumbs} = require('../view/buildBreadcrumbs');

const { gitFileContent, gitFileTree } = require('../api/gitAPI');


module.exports = function(req, res, next) {
    const { hash } = req.params;
    const path = req.params[0].split('/').filter(Boolean);

    gitFileTree(hash, path.join('/'))
        .then(function([file]) {
            if (file && file.type === 'blob') {
                return gitFileContent(file.hash);
            }
        })
        .then(
            content => {
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
            err => next(err)
        );
};
