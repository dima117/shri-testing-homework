const contentController = require('../../controllers/contentController');
const sinon = require('sinon');
const { mockReq, mockRes } = require('sinon-express-mock');

const expect = require('chai').expect;

describe('Содержимое файла коммита',function () {
    it('Возвращает корректную структуру страницы содержимого файла', async function () {
        const req = mockReq();
        const res = mockRes()
        res.render = sinon.spy()

        req.params = {
            '0': 'testFile.js',
            'hash': '1f78f3b14096667c70de44f7025d363614343f17',
        }

        await contentController(req, res);

        expect(res.render.getCall(0).args[1]).to.deep.equal({
            title: 'content',
            breadcrumbs:
                [
                    {
                        text: 'HISTORY',
                        href: '/'
                    },
                    {
                        text: 'ROOT',
                        href: '/files/1f78f3b14096667c70de44f7025d363614343f17/'
                    },
                    {
                        text: 'testFile.js'
                    }
                ],
            content: 'text\nchange1\n'
        });
    });
});
