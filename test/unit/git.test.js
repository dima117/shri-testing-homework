const GitCommands = require('../../utils/git');
var expect  = require('chai').expect;

describe('git.js', function() {
    describe('gitHistory()', () => {
        it('Полученные данные корректно обрабатываются', async () => {
            GitCommands.executeCommand = () => {
                return Promise.resolve(
                    'hash1\tauthor1\ttimestamp1\tTest commit message 1\n' +
                    'hash2\tauthor2\ttimestamp2\tTest commit message 2'
                );
            };

            const result = await GitCommands.gitHistory();

            expect(result).to.eql([ { 
                hash: 'hash1',
                author: 'author1',
                timestamp: 'timestamp1',
                msg: 'Test commit message 1' 
            },
            { 
                hash: 'hash2',
                author: 'author2',
                timestamp: 'timestamp2',
                msg: 'Test commit message 2' 
            }]);
        });

        describe('Корректные аргументы git-команды', () => {
            it('Без аргументов', () => {
                let result;
                GitCommands.executeCommand = (...args) => {
                    result = args;
                    return Promise.resolve('');
                };

                GitCommands.gitHistory();

                expect(result).to.eql(['git', [
                    'log',
                    '--pretty=format:%H%x09%an%x09%ad%x09%s',
                    '--date=iso',
                    '--skip',
                    0,
                    '-n',
                    10]
                ]);
            });

            it('Аргументы page и size', () => {
                const page = 2;
                const size = 3;
                let result;
                GitCommands.executeCommand = (...args) => {
                    result = args;
                    return Promise.resolve('');
                };

                GitCommands.gitHistory(page, size);

                expect(result).to.eql(['git', [
                    'log',
                    '--pretty=format:%H%x09%an%x09%ad%x09%s',
                    '--date=iso',
                    '--skip',
                    3,
                    '-n',
                    3]
                ]);
            });
        });
    });
    
    describe('gitFileTree()', () => {
        const hash = 'testHash';
        const path = 'test/path';

        describe('Корректные аргументы git-команды', () => {
            it('Без аргументов', () => {
                let result;
                GitCommands.executeCommand = (...args) => {
                    result = args;
                    return Promise.resolve('');
                };

                GitCommands.gitFileTree(hash);

                expect(result).to.eql(['git', ['ls-tree', hash]]);
            });

            it('Аргумент path', () => {
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

            expect(result).to.eql([ { 
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
        it('Корректные аргументы git-команды', () => {
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
