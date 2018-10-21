const {gitModule} = require('../utils/git');
const {expect} = require('chai');

describe('git', () => {
    it('Можно преобразовать строку истории в объект parseHistoryItem', () => {
        const line = 'item1\titem2\titem3\titem4';
        const git = new gitModule();

        const result = git.parseHistoryItem(line);

        const eqlResult = {
            hash: 'item1',
            author: 'item2',
            timestamp: 'item3',
            msg: 'item4',
        };

        expect(result).to.eql(eqlResult);
    });

    it('Можно преобразовать строку в объект parseFileTreeItem', () => {
        const line = 'item1 item2 item3\titem4';
        const git = new gitModule();

        const result = git.parseFileTreeItem(line);

        const eqlResult = {
            type: 'item2',
            hash: 'item3',
            path: 'item4'
        };

        expect(result).to.eql(eqlResult);
    });

    it('Получение списка коммитов gitHistory', async () => {
        const exec = (...args) => {
            return Promise.resolve('item11\titem12\titem13\titem14\nitem21\titem22\titem23\titem24');
        };

        const eqlResult = [
            {
                hash: 'item11',
                author: 'item12',
                timestamp: 'item13',
                msg: 'item14'
            },
            {
                hash: 'item21',
                author: 'item22',
                timestamp: 'item23',
                msg: 'item24'
            }
        ];

        const git = new gitModule(exec);
        const result = await git.gitHistory();

        expect(result).to.eql(eqlResult);
    });

    it('Получение списка файлов gitFileTree', async () => {
        const exec = (...args) => {
            return Promise.resolve('item11 item12 item13\titem14\nitem21 item22 item23\titem24');
        };

        const eqlResult = [
            {
                type: 'item12',
                hash: 'item13',
                path: 'item14'
            },
            {
                type: 'item22',
                hash: 'item23',
                path: 'item24'
            }
        ];

        const git = new gitModule(exec);
        const result = await git.gitFileTree();

        expect(result).to.eql(eqlResult);
    });

    it('Получение данные файла, если тип blob, gitFileContent', async () => {
        const exec = (...args) => {
            return Promise.resolve('item1');
        };

        const eqlResult = 'item1';

        const git = new gitModule(exec);
        const result= await git.gitFileContent([{type:'blob'}]);

        expect(result).to.eql(eqlResult);
    })

    it('Не получать данные файла, если тип не blob, gitFileContent', async () => {
        const exec = (...args) => {
            return Promise.resolve('item1');
        };

        const git = new gitModule(exec);
        const result = await git.gitFileContent([{type:'test'}]);

        expect(result).to.be.undefined;
    })
});
