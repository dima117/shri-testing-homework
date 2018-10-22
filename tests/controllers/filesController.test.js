const filesController = require('../../controllers/filesController');
const sinon = require('sinon');
const { mockReq, mockRes } = require('sinon-express-mock');

const expect = require('chai').expect;

describe('Файловая система коммита',function () {
    it('Возвращает корректные результаты для рендеринга файловой системы коммита', async function () {
        const req = mockReq();
        const res = mockRes()
        res.render = sinon.spy()

        req.params = {
            '0': undefined,
            'hash': '2af43ce7c800cc6d7f47de9ec79d8535b73db55e',
        }

        await filesController(req, res);
        expect(res.render.getCall(0).args[1]).to.deep.equal(
            {
                title: 'files',
                breadcrumbs:
                [
                    {
                        text: 'HISTORY',
                        href: '/'
                    },
                    {
                        text: 'ROOT',
                        href: undefined
                    }
                ],
                files:
                [
                    {
                        type: 'blob',
                        hash: '8e27be7d6154a1f68ea9160ef0e18691d20560dc',
                        path: 'testFile.js',
                        href: '/content/2af43ce7c800cc6d7f47de9ec79d8535b73db55e/testFile.js',
                        name: 'testFile.js'
                    }
                ]
            });
    });
});
