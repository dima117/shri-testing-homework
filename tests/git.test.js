const { GitClass } = require('../utils/git');
const { expect } = require('chai');

describe('Блок Гит', () => {
    it('возвращает историю коммитов', async () => {
        let git = new GitClass();

        git.executeGit = () => {
            return new Promise((resolve) => {
                const commit = "30fc48ec578e6b0052f6ab9ea7a118fb31574cdc	Dmitry Andriyanov	2018-10-16 11:23:01 +0300	ссылки на корневую папку";
                resolve(commit);
            });
        };

        let hist = await git.gitHistory(1, 1);

        expect(hist).to.deep.eql([{
            author: 'Dmitry Andriyanov',
            hash: '30fc48ec578e6b0052f6ab9ea7a118fb31574cdc',
            msg: 'ссылки на корневую папку',
            timestamp: '2018-10-16 11:23:01 +0300'
        }]);
    });

    it('возвращает дерево файлов', async () => {
        let git = new GitClass();

        git.executeGit = () => {
            // ./utils для коммита 7e013ae0440ad6e91082599376a6aaebe20d2112
            return new Promise((resolve) => {
                const tree = "040000 tree 0c174efd10167e419bca53f98fde0611072258ba	utils";
                resolve(tree);
            });
        };

        let tree = await git.gitFileTree();

        expect(tree).to.deep.eql([{
            type: 'tree', 
            hash: '0c174efd10167e419bca53f98fde0611072258ba', 
            path: 'utils'
        }]);
    });

    it('возвращает содержимое файла', async () => {
        let git = new GitClass();

        git.executeGit = () => {
            // содержимое файла
            return new Promise((resolve) => {
                const text = "some text in some file";
                resolve(text);
            });
        };

        let file = await git.gitFileContent();

        expect(file).to.eql("some text in some file");
    });
});
