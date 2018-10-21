const { controller } = require('./controller');
const { buildFileUrl, buildBreadcrumbs } = require('../utils/navigation');

class indexController extends controller{

    constructor(req, res, next){
        super(req, res, next);
    }

    async render(offset, size){
        return this.git.gitHistory(offset, size).then(
            history => {
                const list = history.map(item => ({
                    ...item,
                    href: buildFileUrl('files',item.hash)
                }));
                console.log('')
                return this.res.render('index', {
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
