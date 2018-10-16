const {gitFileContent, gitFileTree} = require('../utils/git');

module.exports = function(req, res, next) {
    const { hash } = req.params;
    const path = req.params[0].split('/').filter(Boolean);
    const parentPath = path.slice(0, -1);

    gitFileTree(hash, path.join('/'))
        .then(function([file]) {
            if (file && file.type === 'blob') {
                return gitFileContent(file.hash);
            }
        })
        .then(content => {
            if (content) {
                res.render('content', { title: 'content', content });
            } else {
                next()
            }
        }, err => next(err));
};