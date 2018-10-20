const { controller } = require('./controller');
const { buildFileUrl, buildBreadcrumbs } = require('../utils/navigation');

class indexController extends controller{

    constructor(req, res, next, offset, size){
        super(req, res, next);

        this.render(offset, size);
    }

    render(offset, size){
        this.git.gitHistory(offset, size).then(
            history => {
                const list = history.map(item => ({
                    ...item,
                    href: buildFileUrl('files',item.hash)
                }));

                this.res.render('index', {
                    title: 'history',
                    breadcrumbs: buildBreadcrumbs,
                    list
                });
            },
            err => this.next(err)
        );
    }
}

module.exports = {
    indexController
};
