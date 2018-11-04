const { expect } = require('chai');
const sinon = require('sinon');
const { mockReq, mockRes } = require('sinon-express-mock');
const indexController = require('./indexController');

describe('indexController.js', function() {
    it('Должно вернуть корректные данные для отрисовки истории коммитов', async function() {
        const request = {};
        const req = mockReq(request);
        const res = mockRes();

        res.render = sinon.spy();

        await indexController(req, res);

        expect(res.render.getCall(0).args).to.deep.equal([
            'index',
            {
                title: 'history',
                breadcrumbs: [
                    {
                        text: 'HISTORY',
                        href: undefined
                    }],
                    list: [
                        {
                            author: 'LOST',
                            hash: '44f1ac0f0dc2b5f7233f4895eada99293af5c87b',
                            href: '/files/44f1ac0f0dc2b5f7233f4895eada99293af5c87b/',
                            msg: 'second',
                            timestamp: '2018-10-21 15:25:15 +0300'
                        },
                        {
                            author: 'LOST',
                            hash: 'b78934ff12db6c6e3e436eac8967a53e01331122',
                            href: '/files/b78934ff12db6c6e3e436eac8967a53e01331122/',
                            msg: 'first',
                            timestamp: '2018-10-21 15:25:15 +0300'
                        }
                    ]
            }
        ])
    });
});
