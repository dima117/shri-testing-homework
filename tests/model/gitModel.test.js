const chai = require('chai'),
    expect = chai.expect;

const {executeGit} = require('../../app/model/gitModel');


describe('executeGit',  async() => {
    const testCommits = 'hash1\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
        'hash2\tDmitry Andriyanov\t2018-10-16 12:10:05 +0300\tcodestyle\n' +
        'hash3\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили\n' +
        'hash4\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили\n' +
        'hash5\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
        'hash6\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили\n' +
        'hash7\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
        'hash8\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили\n' +
        'hash9\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
        'hash10\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
        'hash11\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
        'hash12\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
        'hash13\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
        'hash14\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
        'hash15\tDmitry Andriyanov\t2018-10-16 12:10:05 +0300\tcodestyle\n';

    // executeGit.prototype.execFile = function (cmd, params) {
    //     return testCommits;
    // };

    it('should return a string', async () => {
        let result = await executeGit('git', [ 'log',
            '--pretty=format:%H%x09%an%x09%ad%x09%s',
            '--date=iso',
            '--skip',
            0,
            '-n',
            20 ]
        );
        expect(result).to.be.an('string');
    });


});