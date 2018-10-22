let {expect} = require('chai'),
    {Git} = require('../../utils/Git');

let git = new Git();
let executeFileFakeHistOutput = 'a550f88e9f98dfd8b7dfa48789f26e61f8ac4399\tkauzlein\t2018-10-19 09:00:18 +0300\tFixed package.json\n' +
    'd8e9a0dc5e63ae85759601aa55ce4e1d146bda22\tkauzlein\t2018-10-19 00:12:33 +0300\tAdded integration tests';
let executeFileFakeFileOutput = '100755 blob 1fe8bed7a73a1601bd49a1e176ea6fd707e0fffc	controllers/contentController.js\n' +
    '100755 blob 333dc9b68f2a8b38d3f484fe8431a06888b2f22f\tcontrollers/filesController.js\n' +
    '100755 blob 13890eec47a90b39b7df375a3eb2ec4f850b8e2d\tcontrollers/indexController.js';
let fileOutput = 'node_modules\n\n# IntelliJ project files\n.idea/\n\n# Test coverage output\n.nyc_output/\n/hermione-html-report/\n';
let gitHistoryFakeOutput = [
    {
        hash: 'a550f88e9f98dfd8b7dfa48789f26e61f8ac4399',
        author: 'kauzlein',
        timestamp: '2018-10-19 09:00:18 +0300',
        msg: 'Fixed package.json'
    },
    {
        hash: 'd8e9a0dc5e63ae85759601aa55ce4e1d146bda22',
        author: 'kauzlein',
        timestamp: '2018-10-19 00:12:33 +0300',
        msg: 'Added integration tests'
    }
];
let gitFileTreeFakeOutput = [
    {
        type: 'blob',
        hash: '1fe8bed7a73a1601bd49a1e176ea6fd707e0fffc',
        path: 'controllers/contentController.js'
    },
    {
        type: 'blob',
        hash: '333dc9b68f2a8b38d3f484fe8431a06888b2f22f',
        path: 'controllers/filesController.js'
    },
    {
        type: 'blob',
        hash: '13890eec47a90b39b7df375a3eb2ec4f850b8e2d',
        path: 'controllers/indexController.js'
    }
];

context('git.js', function () {


    describe('gitFileContent()', function () {
        it('Должен вернуть содержимое файла по принятому хешу', async function () {
            let result = await git.gitFileContent('6e92c2b2dc2a513cbfe8552e67388f92256a1404');
            expect(result).to.be.equal(fileOutput);
        });
    });

    context('', () => {

        beforeEach(function () {
            git.executeGit = function () {
                return Promise.resolve(executeFileFakeHistOutput);
            };
        });

        describe('gitHistory()', function () {
            it('Должен вернуть массив объектов истории коммитов', async function () {

                let result = await git.gitHistory(1, 10);
                expect(result).to.be.deep.equal(gitHistoryFakeOutput);
            });
        });


        describe('parseHistoryItem()', function () {
            it('Должен вернуть single-объект истории коммита', function () {
                let arr = executeFileFakeHistOutput.split('\n')[0];
                let obj = gitHistoryFakeOutput[0];

                let result = git.parseHistoryItem(arr);

                expect(result).to.be.deep.equal(obj);
            });
        });
    });

    context('', () => {

        beforeEach(function () {
            git.executeGit = function () {
                return Promise.resolve(executeFileFakeFileOutput);
            };
        });

        describe('gitFileTree()', function () {
            it('Должен вернуть массив объектов файловой структуры', async function () {

                let result = await git.gitFileTree('45894a39b3e16425d24301571cfd72714aca5705', 'controllers/');
                expect(result).to.be.deep.equal(gitFileTreeFakeOutput);

            });
        });


        describe('parseFileTreeItem()', function () {
            it('Должен вернуть single-объект истории коммита', function () {
                let arr = executeFileFakeFileOutput.split('\n')[0];
                let obj = gitFileTreeFakeOutput[0];

                let result = git.parseFileTreeItem(arr);

                expect(result).to.be.deep.equal(obj);
            });
        });


    });

});