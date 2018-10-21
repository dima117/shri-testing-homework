const { expect } = require('chai');
const git = require('./git');

describe('git.js', () => {
    describe('parseHistoryItem', () => {
        it('Должен вернуться объект с параметрами коммита', () => {
            const line = 'hash\tauthor\ttime\tcommit message';

            expect(git.parseHistoryItem(line)).to.deep.equal({
                hash: 'hash',
                author: 'author',
                timestamp: 'time',
                msg: 'commit message'
            });
        });
    });

    describe('parseFileTreeItem', () => {
        it('Должен вернуться объект item дерева файлов с параметрами', () => {
            const line = '100644 type hash\tfile';

            expect(git.parseFileTreeItem(line)).to.deep.equal({
                type: 'type',
                hash: 'hash',
                path: 'file',
            });
        });
    });

    describe('gitHistory', () => {
        it('Размер страницы должен равнятся 2', async () => {
            const history = await git.gitHistory(1,2);

            expect(history.length).to.be.equal(2);
        });

    });

    describe('parseFileTreeItem', () => {
        it('Возвращает объект с параметрами файла commit-a', () => {
            const stub = 'id type hash\tpath';

            expect(git.parseFileTreeItem(stub)).to.deep.equal({
                type: 'type',
                hash: 'hash',
                path: 'path',
            });
        });

    });

    describe('gitFileTree', () => {
        it('Возвращает дерево файлов commit-a', async () => {
            const repHistory = '242 blob hashFile\tsomeFile\n4324 tree hashFolder\tfolder';

            git.executeGit = () => {
                return new Promise((resolve) => {
                    resolve(repHistory);
                });
            };

            expect(await git.gitFileTree('hash', '')).to.deep.equal([
                {
                    type: 'blob',
                    hash: 'hashFile',
                    path: 'someFile'
                },
                {
                    type: 'tree',
                    hash: 'hashFolder',
                    path: 'folder'
                }
            ]);
        });

        describe('gitFileContent', () => {
            it('Возвращает содержимое файла', async () => {
                const fileContent = 'some file text';

                git.executeGit = () => {
                    return fileContent;
                };

                expect(await git.gitFileContent('hash', '')).equal(fileContent);
            });

        });
    });
});

