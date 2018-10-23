const { GitMethods } = require('../utils/git');
const { expect } = require('chai');
const git = new GitMethods();

describe('Работа с данными GIT', () => {
    const testCommitsHistory = 
    '0f7b962409d6980236944164c5b0c9f43f9348e9\tDmitry Andriyanov\t2018-10-16 11:54:32 +0300\tхлебные крошки\n'+
    '82810cf7d56476059477aaa5ff55c99ff191be29\tDmitry Andriyanov\t2018-10-16 11:25:59 +0300\tисправлена ошибка\n'+
    '30fc48ec578e6b0052f6ab9ea7a118fb31574cdc\tDmitry Andriyanov\t2018-10-16 11:23:01 +0300\tссылки на корневую папку';
    const testCommitData = 
    '100644 blob aa45e21c29a47bba4c8428e62311df5b563ee15d\tapp.js\n' +
    '040000 tree 8b4a09f575b860abf8076352354858d8e9f3a617\tbin'
    const testHash = 'aa45e21c29a47bba4c8428e62311df5b563ee15d';
    const testPath = '/bin';
    
    describe('Корректные git - команды для получения данных', () => {
        const page = 1;
        const size = 10;

        it('executeGit без заданных аргументов', () => {
            let result;
            git.executeGit = (...args) => {
                result = args;
                return Promise.resolve('');
            };

            git.gitHistory();

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

        it('executeGit с заданными аргументами Page и Size', () => {
            
            let result;
            git.executeGit = (...args) => {
                result = args;
                return Promise.resolve('');
            };

            git.gitHistory(page, size);

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
    });

    describe('Получение дерева файлов', () => {

        it('gitFileTree корректно отрабатывает без данных при отсутствии path', () => {
            let result;
            git.executeGit = (...args) => {
                result = args;
                return Promise.resolve('');
            };
            git.gitFileTree(testHash);
            expect(result).to.eql(['git', ['ls-tree', testHash]]);
        });

        it('gitFileTree корректно отрабатывает без данных при наличии path', () => {
            let result;
            git.executeGit = (...args) => {
                result = args;
                return Promise.resolve('');
            };
            git.gitFileTree(testHash, testPath);
            expect(result).to.eql(['git', ['ls-tree', testHash, testPath]]);
        });

        it('gitFileTree возвращает дерево файлов при реальных данных', async () => {
            let result;
            git.executeGit = () => {
                   return new Promise((resolve) => {
                       resolve(testCommitData);
                   });
               };
       
               const fileTree = await git.gitFileTree();
       
               expect(fileTree).to.eql([
                   {
                   type: 'blob', 
                   hash: 'aa45e21c29a47bba4c8428e62311df5b563ee15d', 
                   path: 'app.js'
               }, {
                   type: 'tree', 
                   hash: '8b4a09f575b860abf8076352354858d8e9f3a617', 
                   path: 'bin'
               }]);
           });

    });

     
    describe('Чтение содержимого файлов', () => { 
        it('gitFileContent корректно отрабатывает без данных', () => {
            let result;
            git.executeGit = (...args) => {
                result = args;
                return Promise.resolve();
            };

            git.gitFileContent(testHash);
            expect(result).to.eql(['git', ['show', testHash]]);
        });

        it('gitFileContent корректно отрабатывает содержимое файлв', async () => {
            const testFileText = 'node_modules';
            git.executeGit = () => {
                return new Promise((resolve) => {
                    resolve(testFileText);
                });
            };
    
            let testFile = await git.gitFileContent();
            expect(testFile).to.eql("node_modules");
        });
    });


    

    describe('Формирование истории коммитов', () => {
        it('gitHistory возвращает верное количество коммитов', async () => {
       
            git.executeGit = () => {
                return new Promise((resolve) => {
                    resolve(testCommitsHistory);
                });
            };
            
            const history = await git.gitHistory(1, 10);
            expect(history).to.have.lengthOf(3);
        });

        it('gitHistory возвращает верную данные в коммитах', async () => {
            git.executeGit = () => {
                return new Promise((resolve) => {
                    resolve(testCommitsHistory);
                });
            };
            
            const history = await git.gitHistory(1, 10);
            expect(history).to.eql([
                {
                author: 'Dmitry Andriyanov',
                hash: '0f7b962409d6980236944164c5b0c9f43f9348e9',
                msg: 'хлебные крошки',
                timestamp: '2018-10-16 11:54:32 +0300'
            },
            {
                author: 'Dmitry Andriyanov',
                hash: '82810cf7d56476059477aaa5ff55c99ff191be29',
                msg: 'исправлена ошибка',
                timestamp: '2018-10-16 11:25:59 +0300'
            },
            {
                author: 'Dmitry Andriyanov',
                hash: '30fc48ec578e6b0052f6ab9ea7a118fb31574cdc',
                msg: 'ссылки на корневую папку',
                timestamp: '2018-10-16 11:23:01 +0300'
            }]);
        });

    });
    
});
