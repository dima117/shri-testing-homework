const {getHistory} = require('../../controllers/history/history');
const {expect} = require('chai');
const sinon = require('sinon');

describe('History', function() {

    it('Should be displayed commit history list', function (done) {
        const execute = sinon.stub().resolves('cc2284293758e32c50fa952da2f487c8c5e8d023\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme');

        const start = 1;
        const end = 5;
        
        getHistory(execute, start, end).then((data) => {
            const result = [{
                hash: 'cc2284293758e32c50fa952da2f487c8c5e8d023',
                author: 'Dmitry Andriyanov',
                timestamp: '2018-10-16 12:36:32 +0300',
                msg: 'readme',
                href: '/files/cc2284293758e32c50fa952da2f487c8c5e8d023/'
            }];

            expect(data).to.deep.equal(result);
            done();
        });
    });

})

