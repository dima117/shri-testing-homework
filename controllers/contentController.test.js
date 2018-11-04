const { expect } = require('chai');
const sinon = require('sinon');
const { mockReq, mockRes } = require('sinon-express-mock');
const contentController = require('./contentController');

describe('ContentController.js', function() {
    it('Должно вернуть корректные данные для отрисовки содержимого файла', async function() {
        const request = {
            params: {
                '0': 'file1.txt',
                hash: '44f1ac0f0dc2b5f7233f4895eada99293af5c87b'
            }
        };
        const req = mockReq(request);
        const res = mockRes();

        res.render = sinon.spy();

        await contentController(req, res);

        expect(res.render.getCall(0).args).to.deep.equal([
            'content',
            {
                title: 'content',
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
                        text: 'file1.txt'
                    }
                ],
                content: 'file1\n'
            }
        ])
    });
});
