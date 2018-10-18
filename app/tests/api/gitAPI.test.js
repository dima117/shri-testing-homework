const chai = require('chai'),
    expect = chai.expect;

const {gitHistory, gitFileTree, gitFileContent} = require('../../api/gitAPI');


describe('gitHistory', () => {
    const testCommits = 'hash1\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
        'hash2\tDmitry Andriyanov\t2018-10-16 12:10:05 +0300\tcodestyle\n' +
        '' + '\n' +
        'hash3\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили\n',

        stubExecuteGit = function (type, params) {
            return new Promise((resolve, reject) => {
                resolve(testCommits);
            });
        };


    it('should return an array', async () => {
        let result = await gitHistory(1, 10, stubExecuteGit);
        expect(result).to.be.an('array');
    });


    it('should have 3 commits', async () => {
        let result = await gitHistory(1, 10, stubExecuteGit);
        expect(result.length).to.be.equal(3);
    });

});

describe('gitFileTree', () => {
    const testCommits = '100644\tblob\t27e5864fa4f9a15d22ef81a804ca339fa4befbcd\t.gitignore\n' +
        '040000\ttree\t96562099b69657adc1f0cd5b6c2269a33510a523\tREADME.md\n' +
        '100644\tblob\td1d58e83250151814bb737aa18db16eea99618eb\tapi\n',

        stubExecuteGit = function (type, params) {
            return new Promise((resolve, reject) => {
                resolve(testCommits);
            });
        };


    it('should return an array', async () => {
        let result = await gitFileTree(1, 10, stubExecuteGit);
        expect(result).to.be.an('array');
    });


    it('should have 3 commits', async () => {
        let result = await gitFileTree(1, 10, stubExecuteGit);
        expect(result.length).to.be.equal(3);
    });
});

describe('gitFileContent', () => {
    const testCommits = 'node_modules',

        stubExecuteGit = function (type, params) {
            return new Promise((resolve, reject) => {
                resolve(testCommits);
            });
        };

    it('should return a string', async () => {
        let result = await gitFileContent(1, stubExecuteGit);
        expect(result).to.be.a('string');
    });


    it('should have content "node_modules"',  async () => {
        let result = await gitFileContent(1, stubExecuteGit);
        expect(result).to.be.equal('node_modules');
    });
});
