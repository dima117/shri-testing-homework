const { gitModule } = require('../utils/git');
const { buildBreadcrumbs } = require('../utils/navigation');

class contentController {

    constructor(req, res, next){
        this.next = next;
        this.res = res;
        this.hash = req.params ? req.params.hash : undefined;
        this.path = req.params ? req.params[0].split('/').filter(Boolean).join('/') : undefined;
        this.git = new gitModule();

        this.render();
    }

    render(){
        const git = this.git;
        this.git.gitFileTree(this.hash, this.path)
            .then(([file]) => {
                if (file && file.type === 'blob') {
                    return this.git.gitFileContent(file.hash);
                }
            })
            .then(
                content => {
                    if (content) {
                        this.res.render('content', {
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
