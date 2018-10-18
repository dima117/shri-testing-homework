const GitCommands = require('../../utils/git');
var expect  = require('chai').expect;

describe('git.js', function() {
    describe('gitFileContent()', () => {
        it('Выполняется правильная git-команда', () => {
            const hash = 'testHash';
            let result;

            GitCommands.executeCommand = (...args) => {
                result = args;
                return Promise.resolve();
            };

            GitCommands.gitFileContent(hash);

            expect(result).to.eql(['git', ['show', hash]]);
        });
    });
});
