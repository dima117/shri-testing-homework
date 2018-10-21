const { expect } = require('chai');

const Git = require('../../utils/git');
const { history, historyResult, files, filesResult } = require('./test-data');

describe('utils/git.js', function() {
    it('получаем историю', async () => {
        Git.executeGit = function () {
            return Promise.resolve(history)
        };
    
        let result = await Git.gitHistory();
    
        expect(result).to.eql(historyResult);
    });
    
    it('получаем дерево', async () => {
        Git.executeGit = function () {
            return Promise.resolve(files)
        };
    
        let result = await Git.gitFileTree();
        
        expect(result).to.eql(filesResult);
    });
    
    it('получаем контент', async () => {
        Git.executeGit = function () {
            return Promise.resolve('content')
        };
    
        let result = await Git.gitFileContent();
        
        expect(result).to.eql('content');
    });
})
