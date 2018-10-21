const { gitModule } = require('../utils/git');

class controller{

    constructor(req, res, next){
        this.next = next;
        this.res = res;
        this.hash = req.params && req.params.hash;
        this.path = this.getPath(req);
        this.git = new gitModule();
    }

    getPath(req) {
        return req.params && req.params[0] ? req.params[0].split('/').filter(Boolean).join('/') : '';
    }
}

module.exports = {
    controller
};
