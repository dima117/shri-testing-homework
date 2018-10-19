// const chai = require('chai'),
//     expect = chai.expect;
//
// const {executeGit} = require('../../model/gitModel');
//
//
// describe('executeGit', () => {
//     const testCommits = 'hash1\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
//         'hash2\tDmitry Andriyanov\t2018-10-16 12:10:05 +0300\tcodestyle\n' +
//         'hash3\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили\n' +
//         'hash4\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили\n' +
//         'hash5\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
//         'hash6\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили\n' +
//         'hash7\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
//         'hash8\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили\n' +
//         'hash9\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
//         'hash10\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
//         'hash11\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
//         'hash12\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
//         'hash13\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
//         'hash14\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
//         'hash15\tDmitry Andriyanov\t2018-10-16 12:10:05 +0300\tcodestyle\n';
//
//         stubExecuteFile = function (cmd, args) {
//
//         };
//
//
//     it('should return a string', async () => {
//         let result = await gitHistory(1, 10, stubExecuteGit);
//         expect(result).to.be.an('string');
//     });
//
//
//     // it('should have 3 commits', async () => {
//     //     let result = await gitHistory(1, 10, stubExecuteGit);
//     //     expect(result.length).to.be.equal(3);
//     // });
//
// });