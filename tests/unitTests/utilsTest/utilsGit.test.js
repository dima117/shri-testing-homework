const { UtilGit } = require('../../../utils/git');
const { expect } = require('chai');

describe('Utils Git Tests', () => {

    describe('UtilGit.gitHistory Tests', () => {

        it('gitHistory transmits to executeGit expected mock', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const data = 'hash\tauthor\ttimestamp\tmsg';
            let mock;
            const expectedMock = [ 'git', [
                'log',
                '--pretty=format:%H%x09%an%x09%ad%x09%s',
                '--date=iso',
                '--skip',
                0,
                '-n',
                10
            ]
            ];

            utilGit.executeGit = async (...args) => {
                mock = args;
                return await data;
            };

            // действиe
            const result = await utilGit.gitHistory();

            // проверка
            expect(mock).to.be.eql(expectedMock);
        });

        it('Can return git history', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const data = 'hash\tauthor\ttimestamp\tmsg';

            utilGit.executeGit = async () => {
                return await data;
            };

            // действиe
            const result = await utilGit.gitHistory();

            // проверка
            expect(result.length).to.be.eql(1);
        });

        it('Can return git history of 0 commits', async () => {
            // подготовка
            const utilGit = new UtilGit();
            let data = '';

            utilGit.executeGit = async () => {
                return await data;
            };

            // действиe
            const result = await utilGit.gitHistory();
            // проверка
            expect(result.length).to.be.eql(0);
        });

        it('Can return git history of two commits', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const data = 'hash\tauthor\ttimestamp\tmsg1' + '\nhash\tauthor\ttimestamp\tmsg2';

            utilGit.executeGit = async () => {
                return await data;
            };

            // действиe
            const result = await utilGit.gitHistory();
            // проверка
            expect(result.length).to.be.eql(2);
        });

        it('Can return git history of 1000 commits', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const limit = 1000;
            let data = 'hash\tauthor\ttimestamp\tmsg0';
            for (let i = 1; i < limit; i++) {
                data += '\nhash\tauthor\ttimestamp\tmsg' + i;
            }

            utilGit.executeGit = async () => {
                return await data;
            };

            // действиe
            const result = await utilGit.gitHistory();
            // проверка
            expect(result.length).to.be.eql(limit);
        });

        // ВОПРОС: можно как-то автоматизировать похожие{однотипные} тесты?
        it('Should consist correct hash', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const data = 'hash/hash2\tauthor\ttimestamp\tmsg';

            utilGit.executeGit = async () => {
                return await data;
            };

            // действиe
            const result = await utilGit.gitHistory();

            // проверка
            expect(result[0].hash).to.be.eql('hash/hash2');
        });

        it('Should consist correct author', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const data = 'hash\tauthor-selnapenek1995%#$%\ttimestamp\tmsg';

            utilGit.executeGit = async () => {
                return await data;
            };

            // действиe
            const result = await utilGit.gitHistory();

            // проверка
            expect(result[0].author).to.be.eql('author-selnapenek1995%#$%');
        });

        it('Should consist correct timestamp', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const data = 'hash\tauthor\t"№%timestamp№"\tmsg';

            utilGit.executeGit = async () => {
                return await data;
            };

            // действиe
            const result = await utilGit.gitHistory();

            // проверка
            expect(result[0].timestamp).to.be.eql('"№%timestamp№"');
        });

        it('Should consist correct msg', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const data = 'hash\tauthor\ttimestamp\tWASSSUUUUP';

            utilGit.executeGit = async () => {
                return await data;
            };

            // действиe
            const result = await utilGit.gitHistory();

            // проверка
            expect(result[0].msg).to.be.eql('WASSSUUUUP');
        });



    });

    describe('UtilGit.gitFileTree Tests', () => {

        it('gitFileTree transmits to executeGit expected mock', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const hash = 'hash';
            const path = 'path/pathToFile';
            const data = '040000 tree hash\tpath/pathToFile';
            let mock;
            const expectedMock = [ 'git', [ 'ls-tree', 'hash', 'path/pathToFile' ] ];

            utilGit.executeGit = async (...args) => {
                mock = args;
                return await data;
            };

            // действиe
            const result = await utilGit.gitFileTree(hash, path);

            // проверка
            expect(mock).to.be.eql(expectedMock);
        });

        it('Can return git file tree', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const hash = 'hash';
            const path = 'path/pathToFile';
            const data = '040000 tree hash\tpath/pathToFile';

            utilGit.executeGit = async () => {
                return await data;
            };

            // действиe
            const result = await utilGit.gitFileTree(hash, path);

            // проверка
            expect(result.length).to.be.eql(1);
        });

        it('Can return git file tree of two files', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const hash = 'hash';
            const path = 'path/pathToFile';
            const data = '040000 tree hash1\tpath/pathToFile1' + '\n050000 tree hash2\tpath/pathToFile2';

            utilGit.executeGit = async () => {
                return await data;
            };

            // действиe
            const result = await utilGit.gitFileTree(hash, path);
            // проверка
            expect(result.length).to.be.eql(2);
        });

        it('Can return git file tree of empty folder', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const hash = 'hash';
            const path = 'path/pathToFile';
            const data = '';

            utilGit.executeGit = async () => {
                return await data;
            };

            // действиe
            const result = await utilGit.gitFileTree(hash, path);
            // проверка
            expect(result.length).to.be.eql(0);
        });

        it('Should consist correct type', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const hash = 'hash';
            const path = 'path/pathToFile';
            const data = '040000 tree hash\tpath/pathToFile';

            utilGit.executeGit = async () => {
                return await data;
            };

            // действиe
            const result = await utilGit.gitFileTree(hash, path);

            // проверка
            expect(result[0].type).to.be.eql('tree');
        });

        it('Should consist correct hash', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const hash = 'hash';
            const path = 'path/pathToFile';
            const data = '040000 tree hash\tpath/pathToFile';

            utilGit.executeGit = async () => {
                return await data;
            };

            // действиe
            const result = await utilGit.gitFileTree(hash, path);

            // проверка
            expect(result[0].hash).to.be.eql(hash);
        });

        it('Should consist correct path', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const hash = 'hash';
            const path = 'path/pathToFile';
            const data = '040000 tree hash\tpath/pathToFile';

            utilGit.executeGit = async () => {
                return await data;
            };

            // действиe
            const result = await utilGit.gitFileTree(hash, path);

            // проверка
            expect(result[0].path).to.be.eql(path);
        });

    });

    describe('UtilGit.gitFileContent Tests', () => {

        it('gitFileContent transmits to executeGit expected mock', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const hash = 'hash';
            const path = 'path/pathToFile';
            const data = '040000 tree hash\tpath/pathToFile';
            let mock;
            const expectedMock = [ 'git', [ 'show', 'hash' ] ];

            utilGit.executeGit = async (...args) => {
                mock = args;
                return await data;
            };

            // действиe
            const result = await utilGit.gitFileContent(hash, path);

            // проверка
            expect(mock).to.be.eql(expectedMock);
        });

        it('Can return git file content', async () => {
            // подготовка
            const utilGit = new UtilGit();
            const hash = 'hash';
            const data = '040000 blob hash';

            utilGit.executeGit = async () => {
                return await data;
            };

            // действиe
            const result = await utilGit.gitFileContent(hash);

            // проверка
            expect(result).to.be.eql(data);
        });

    });

});
