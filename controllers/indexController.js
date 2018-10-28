const Git = require('../utils/git');
const Navigation = require('../utils/navigation');

const git = new Git();
const navigation = new Navigation();

module.exports = function (req, res) {
    git.gitHistory(1, 20).then(
        history => {
            const list = history.map(item => ({
                ...item,
                href: navigation.buildFolderUrl(item.hash, '')
            }));

            res.render('index', {
                title: 'history',
                breadcrumbs: navigation.buildBreadcrumbs(),
                list
            });
        },
        err => next(err)
    );
};
