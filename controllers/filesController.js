const { controller } = require('./controller');
const {
    buildObjectUrl,
    buildBreadcrumbs
} = require('../utils/navigation');

class filesController extends controller{

    constructor(req, res, next){
        super(req, res, next);
        this.pathTree = !this.path ? this.path : this.path + '/';
    }

    async render(){
        return this.git.gitFileTree(this.hash, this.pathTree).then(
            list => {
                const files = list.map(item => ({
                    ...item,
                    href: buildObjectUrl(this.hash, item),
                    name: item.path.split('/').pop()
                }));
                return this.res.render('files', {
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
