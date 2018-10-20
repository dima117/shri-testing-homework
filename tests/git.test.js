const { gitModule } = require('../utils/git');
const { expect } = require('chai');

it('Можно преобразовать строку истории в объект parseHistoryItem', function(){
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

it('Можно преобразовать строку в объект parseFileTreeItem', function(){
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

it('Можно преобразовать строку в объект parseFileTreeItem', function(){
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