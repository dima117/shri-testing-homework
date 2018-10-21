const getHistory = require('../../controllers/history/history').getHistory;
const {expect} = require('chai');

describe('Commit history', function() {
    function executeGit(...args) {
        return Promise.resolve(`cc2284293758e32c50fa952da2f487c8c5e8d023\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme`);
    }

    it('Should be displayed commit history list', function (done) {
        const start = 1;
        const end = 5;

        getHistory(executeGit, start, end).then((data) => {
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

