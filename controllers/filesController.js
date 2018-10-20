const { gitModule } = require('../utils/git');
const {
    buildObjectUrl,
    buildBreadcrumbs
} = require('../utils/navigation');

class filesController{

    constructor(req, res, next){
        this.next = next;
        this.res = res;
        this.hash = req.params.hash;
        const pathParam = (req.params[0] || '').split('/').filter(Boolean);
        this.path = pathParam.length ? pathParam.join('/') + '/' : '';
        this.git = new gitModule();

        this.render();
    }

    render(){
        return this.git.gitFileTree(this.hash, this.path).then(
            list => {
                const files = list.map(item => ({
                    ...item,
                    href: buildObjectUrl(this.hash, item),
                    name: item.path.split('/').pop()
                }));

                this.res.render('files', {
                    title: 'files',
                    breadcrumbs: buildBreadcrumbs(this.hash, this.path),
                    files
                });
            },
            err => this.next(err)
        );
    }
}

module.exports = {
    filesController
};
