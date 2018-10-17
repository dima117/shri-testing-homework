const chai = require('chai'),
    expect = chai.expect;

const {gitHistory, gitFileTree, gitFileContent} = require('../../api/gitAPI');


describe('gitHistory', () => {
    const executeGit = function () {
        return 'cc2284293758e32c50fa952da2f487c8c5e8d023\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
            '7e013ae0440ad6e91082599376a6aaebe20d2112\tDmitry Andriyanov\t2018-10-16 12:10:05 +0300\tcodestyle\n' +
            'f2df8ac23e817f6da01624a77ec050a0147f642a\tDmitry Andriyanov\t2018-10-16 12:02:11 +0300\tстили\n';
    };
    // it('можно загружать элементы с бэкенда', async () => {
    //     // подготовка
    //     let list = new TodoList();
    //
    //     list.fetch = () => {
    //         return Promise.resolve(['item1', 'item2']);
    //     };
    //
    //     // действие
    //     await list.load();
    //
    //     // проверка
    //     expect(list.items.map(i => i.name)).to.eql(['item1', 'item2']);
    // });
});

describe('gitFileTree', () => {
    const executeGit = function () {
        return '100644\tblob\t27e5864fa4f9a15d22ef81a804ca339fa4befbcd\t.gitignore\n' +
            '040000\ttree\t96562099b69657adc1f0cd5b6c2269a33510a523\tREADME.md\n' +
            '100644\tblob\td1d58e83250151814bb737aa18db16eea99618eb\tapi\n';
    };
});
describe('gitFileContent', () => {
    const executeGit = function () {
        return 'node_modules';
    };
});