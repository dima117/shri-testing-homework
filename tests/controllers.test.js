const { expect } = require('chai');
const sinon = require('sinon');
const { indexController } = require('../controllers/indexController');
const { filesController } = require('../controllers/filesController');

describe('indexController', () => {
    it('один раз вызывается res.render в indexController', async () => {
        let req = {};
        let res = {
            render: sinon.spy()
        };

        const test = new indexController(req, res);

        await test.render(0, 1).then(()=>{
            expect(res.render.calledOnce).to.be.true;
        })
    });

    it('в первом результате res.render указан лайаут index, indexController', async () => {
        let req = {};
        let res = {
            render: sinon.spy()
        };

        const test = new indexController(req, res);

        await test.render(0, 1).then(()=>{
            expect(res.render.firstCall.args[0]).to.equal('index');
        })
    });
});
