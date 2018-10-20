const { gitModule } = require('../utils/git');
const { buildFileUrl, buildBreadcrumbs } = require('../utils/navigation');

class indexController{

    constructor(req, res, next, page, size){
        this.res = res;
        this.next = next;
        this.git = new gitModule();

        this.render(page, size);
    }

    render(page, size){
        this.git.gitHistory(page, size).then(
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
