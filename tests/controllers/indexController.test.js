const indexController = require('../../controllers/indexController');
const sinon = require('sinon');
const { mockReq, mockRes } = require('sinon-express-mock');

const expect = require('chai').expect;

describe('История коммитов',function () {
    it('Возвращает корректные результаты для рендеринга index страницы', async function () {
        const req = mockReq();
        const res = mockRes()
        res.render = sinon.spy()
        await indexController(req, res);

        expect(res.render.getCall(0).args[1]).to.deep.eq({
                title: 'history',
                breadcrumbs: [ { text: 'HISTORY', href: undefined } ],
                list: [
                    {
                        hash: 'ae9dfcb7d7e823a9b3f2406678165ceea09dc0fe',
                        author: 'Arsen',
                        timestamp: '2018-10-22 16:27:03 +0300',
                        msg: 'added nested folder',
                        href: '/files/ae9dfcb7d7e823a9b3f2406678165ceea09dc0fe/'
                    },
                    {
                        hash: '1f78f3b14096667c70de44f7025d363614343f17',
                        author: 'Arsen',
                        timestamp: '2018-10-21 22:16:44 +0300',
                        msg: 'change 1',
                        href: '/files/1f78f3b14096667c70de44f7025d363614343f17/'
                    },
                    {
                        hash: '2af43ce7c800cc6d7f47de9ec79d8535b73db55e',
                        author: 'Arsen',
                        timestamp: '2018-10-21 21:02:17 +0300',
                        msg: 'first commit',
                        href: '/files/2af43ce7c800cc6d7f47de9ec79d8535b73db55e/'
                    } ]
            });

    });
});
