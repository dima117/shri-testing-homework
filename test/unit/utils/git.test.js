const GitCommands = require('../../../utils/git');
var expect  = require('chai').expect;

describe('git.js', function() {
    describe('gitFileContent()', () => {
        it('Git вызывает правильную команду', () => {
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
