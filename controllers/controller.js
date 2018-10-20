const { gitModule } = require('../utils/git');

class controller{

    constructor(req, res, next){
        this.next = next;
        this.res = res;
        this.hash = req.params.hash;
        this.path = req.params && req.params[0] ? req.params[0].split('/').filter(Boolean).join('/') : '';
        this.git = new gitModule();
    }
}

module.exports = {
    controller
};
