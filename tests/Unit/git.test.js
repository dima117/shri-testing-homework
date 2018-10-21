const { assert } = require('chai');
const sinon = require('sinon');
const Git = require('../../utils/git');

describe('Git', () => {
    const git = new Git();
    const executeGit = sinon.stub(git, 'executeGit');

    describe('parseHistoryItem', () => {
        const src = [
            '90180910fc27a11272a3e5caeeb119a51e5c0545	Dmitry Andriyanov	2018-10-16 12:49:56 +0300	исправлена опечатка в readme',
            '7e013ae0440ad6e91082599376a6aaebe20d2112	Dmitry Andriyanov	2018-10-16 12:10:05 +0300	codestyle',
            'f2df8ac23e817f6da01624a77ec050a0147f642a	Dmitry Andriyanov	2018-10-16 12:02:11 +0300	стили'
        ];

        it('correctly parse history item', () => {
            assert.include(git.parseHistoryItem(src[0]), {
                hash: '90180910fc27a11272a3e5caeeb119a51e5c0545',
                author: 'Dmitry Andriyanov',
                timestamp: '2018-10-16 12:49:56 +0300',
                msg: 'исправлена опечатка в readme'
            });

            assert.include(git.parseHistoryItem(src[1]), {
                hash: '7e013ae0440ad6e91082599376a6aaebe20d2112',
                author: 'Dmitry Andriyanov',
                timestamp: '2018-10-16 12:10:05 +0300',
                msg: 'codestyle'
            });

            assert.include(git.parseHistoryItem(src[2]), {
                hash: 'f2df8ac23e817f6da01624a77ec050a0147f642a',
                author: 'Dmitry Andriyanov',
                timestamp: '2018-10-16 12:02:11 +0300',
                msg: 'стили'
            });
        });
    });

    describe('gitHistory', () => {
        executeGit.returns(new Promise(resolve => {
            resolve('90180910fc27a11272a3e5caeeb119a51e5c0545	Dmitry Andriyanov	2018-10-16 12:49:56 +0300	исправлена опечатка в readme');
        }));

        it('should return correct structure objects', () => {
            return git.gitHistory().then((data) => {
                assert.containsAllKeys(data[0], ['hash', 'author', 'timestamp', 'msg']);
            });
        });
    });

    describe('parseFileTreeItem', () => {
        const src = [
            '100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8	.gitignore',
            '100644 blob 70461d5f9009344d9933e889b0448aa3f18d83d9	app.js',
            '040000 tree 152db3caa8a0d01acc76abc9df36e6b432ad1e55	bin',
        ];

        it('correctly parse file tree', () => {
            assert.include(git.parseFileTreeItem(src[0]), {
                type: 'blob',
                hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
                path: '.gitignore'
            });

            assert.include(git.parseFileTreeItem(src[1]), {
                type: 'blob',
                hash: '70461d5f9009344d9933e889b0448aa3f18d83d9',
                path: 'app.js'
            });

            assert.include(git.parseFileTreeItem(src[2]), {
                type: 'tree',
                hash: '152db3caa8a0d01acc76abc9df36e6b432ad1e55',
                path: 'bin'
            });
        });
    });

    describe('gitFileTree', () => {
        executeGit.returns(new Promise(resolve => {
            resolve('100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8	.gitignore\n100644 blob 70461d5f9009344d9933e889b0448aa3f18d83d9	app.js\n040000 tree 152db3caa8a0d01acc76abc9df36e6b432ad1e55	bin');
        }));

        it('correctly amount files', () => {
            return git.gitFileTree().then(data => {
                assert.equal(data.length, 3);
            });
        });
    });
});