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

    it('проверка построения path, когда params нет. getPath, controller', () => {
        const req = {};
        const test = new indexController(req);

        const result = test.getPath(req);

        expect(result).to.equal('');
    });

    it('проверка построения path. getPath, controller', () => {
        const req = {
            params: [
                'item1//item2'
            ]
        };
        const test = new indexController(req);

        const eqlResult = 'item1/item2';

        const result = test.getPath(req);

        expect(result).to.equal(eqlResult);
    });

    it('проверка построения path, когда params пустой. getPath, controller', () => {
        const req = {
            params: ''
        };
        const test = new indexController(req);

        const eqlResult = '';

        const result = test.getPath(req);

        expect(result).to.equal(eqlResult);
    });
});
