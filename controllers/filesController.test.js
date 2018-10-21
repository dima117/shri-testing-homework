const { expect } = require('chai');
const { mockReq, mockRes } = require('sinon-express-mock');
const sinon = require('sinon');
const filesController = require('./filesController');

describe('filesController.js', function() {
    it('Должно вернуть корректные данные для отрисовки дерева файлов', async function() {
        const request = {
            params: {
                '0': 'app',
                hash: '44f1ac0f0dc2b5f7233f4895eada99293af5c87b'
            }
        };
        const req = mockReq(request);
        const res = mockRes();

        res.render = sinon.spy();

        await filesController(req, res);

        expect(res.render.getCall(0).args).to.deep.equal([
            'files',
            {
                title: 'files',
                breadcrumbs: [
                    {
                        text: 'HISTORY',
                        href: '/'
                    },
                    {
                        href: '/files/44f1ac0f0dc2b5f7233f4895eada99293af5c87b/',
                        text: 'ROOT'
                    },
                    {
                        text: 'app'
                    }
                ],
                files: [
                    {
                        hash: '6c493ff740f9380390d5c9ddef4af18697ac9375',
                        href: '/content/44f1ac0f0dc2b5f7233f4895eada99293af5c87b/app/file2.txt',
                        name: 'file2.txt',
                        path: 'app/file2.txt',
                        type: 'blob'
                    }
                ]
            }
        ])
    });
});
