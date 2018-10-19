const chai = require('chai'),
    expect = chai.expect;
const {indexController} = require('../../controllers/indexController');
//
// describe('indexController', () => {
//
//     it('should return an array', async () => {
//         indexController.then(data => console.log(data));
//         // console.log(result);
//         expect([]).to.be.an('array');
//     });
//
//     //
//     // it('should have 3 commits', async () => {
//     //     let result = await gitHistory(1, 10, stubExecuteGit);
//     //     expect(result.length).to.be.equal(3);
//     // });
//
// });