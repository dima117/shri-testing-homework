const GitCommands = require('../../utils/git');
var expect  = require('chai').expect;

describe('git.js', function() {
    describe('gitHistory()', () => {
        // Тесты для gitHistory()
    });
    
    describe('gitFileTree()', () => {
        const hash = 'testHash';
        const path = 'test/path';

        describe('В git-команду передаются корректные аргументы', () => {
            it('Без path', () => {
                let result;
                GitCommands.executeCommand = (...args) => {
                    result = args;
                    return Promise.resolve('');
                };

                GitCommands.gitFileTree(hash);

                expect(result).to.eql(['git', ['ls-tree', hash]]);
            });

            it('С path', () => {
                let result;
                GitCommands.executeCommand = (...args) => {
                    result = args;
                    return Promise.resolve('');
                };

                GitCommands.gitFileTree(hash, path);

                expect(result).to.eql(['git', ['ls-tree', hash, path]]);
            });
        });

        it('Полученные данные корректно обрабатываются', async () => {
            GitCommands.executeCommand = () => {
                return Promise.resolve(
                    '100644 blob 70461d5f9009344d9933e889b0448aa3f18d83d9\tapp.js\n' +
                    '040000 tree 152db3caa8a0d01acc76abc9df36e6b432ad1e55\tbin'
                );
            };

            const result = await GitCommands.gitFileTree(hash);

            expect(result).to.be.eql([ { 
                type: 'blob',
                hash: '70461d5f9009344d9933e889b0448aa3f18d83d9',
                path: 'app.js' 
            },
            { 
                type: 'tree',
                hash: '152db3caa8a0d01acc76abc9df36e6b432ad1e55',
                path: 'bin' 
            }]);
        });
    });

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
