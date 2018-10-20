const { controller } = require('./controller');
const {
    buildObjectUrl,
    buildBreadcrumbs
} = require('../utils/navigation');

class filesController extends controller{

    constructor(req, res, next){
        super(req, res, next);

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
