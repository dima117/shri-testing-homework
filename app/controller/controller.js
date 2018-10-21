const {buildBreadcrumbs} = require("../view/buildBreadcrumbs");

const{GitApi} = require('../api/gitApi');
const {buildFolderUrl, buildObjectUrl} = require('../utils/navigation');


class Controller {
    constructor() {
        this.gitApi = new GitApi();
    }


    indexController(req, res) {
        return this.gitApi.gitHistory(1, 20).then(history => {
                const list = history.map(item => ({
                    ...item,
                    href: buildFolderUrl(item.hash, '')
                }));

                const renderOptions = {
                    title: 'history',
                    breadcrumbs: buildBreadcrumbs(),
                    list
                };
                res.render('index', renderOptions);

                return renderOptions;
            },
            err => next(err)
        );
    }


    contentController(req, res, next) {
        const {hash} = req.params;
        const path = req.params[0].split('/').filter(Boolean);

        return this.gitApi.gitFileTree(hash, path.join('/'))
            .then(([file]) => {
                if (file && file.type === 'blob') {
                    return this.gitApi.gitFileContent(file.hash);
                }
            })
            .then(
                content => {
                    if (content) {
                        const renderOptions = {
                            title: 'content',
                            breadcrumbs: buildBreadcrumbs(hash, path.join('/')),
                            content
                        };
                        res.render('content', renderOptions);
                        return renderOptions;
                    } else {
                        return next();
                    }
                },
                err => next(err)
            );
    }


    filesController(req, res, next) {
        const {hash} = req.params;
        const pathParam = (req.params[0] || '').split('/').filter(Boolean);

        const path = pathParam.length ? pathParam.join('/') + '/' : '';

        return this.gitApi.gitFileTree(hash, path).then(
            list => {
                const files = list.map(item => ({
                    ...item,
                    href: buildObjectUrl(hash, item),
                    name: item.path.split('/').pop()
                }));

                const renderOptions = {
                    title: 'files',
                    breadcrumbs: buildBreadcrumbs(hash, pathParam.join('/')),
                    files
                };

                res.render('files', renderOptions);
                return renderOptions;
            },
            err => next(err)
        );
    }
}

module.exports = {
    Controller
};