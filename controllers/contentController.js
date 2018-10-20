const { controller } = require('./controller');
const { buildBreadcrumbs } = require('../utils/navigation');

class contentController extends controller{

    constructor(req, res, next){
        super(req, res, next);
    }

    async render(){
        return this.git.gitFileTree(this.hash, this.path)
            .then(files => {
                return this.git.gitFileContent(files);
            })
            .then(
                content => {
                    if (content) {
                        return this.res.render('content', {
                            title: 'content',
                            breadcrumbs: buildBreadcrumbs(this.hash, this.path),
                            content
                        });
                    } else {
                        this.next();
                    }
                },
                err => this.next(err)
            );
    }
}

module.exports = {
    contentController
};
