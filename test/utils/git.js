const Git = require('../../utils/git');
const { expect } = require('chai');
const sinon = require('sinon');

const GIT_COMMAND = 'git';
const gitHistoryData = '90180910fc27a11272a3e5caeeb119a51e5c0545\t' +
    'Dmitry Andriyanov\t2018-10-16 12:49:56 +0300\tисправлена опечатка в readme\n' +
    'cc2284293758e32c50fa952da2f487c8c5e8d023\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme\n' +
    '7e013ae0440ad6e91082599376a6aaebe20d2112\tDmitry Andriyanov\t2018-10-16 12:10:05 +0300\tcodestyle\n';

const gitFileTreeData = '100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8\t.gitignore\n' +
    '100644 blob ead09676a936eb50ed700dad0d280d65c3df21d8\t.README.md\n' +
    '100644 blob 70461d5f9009344d9933e889b0448aa3f18d83d9\tapp.js\n' +
    '040000 tree 152db3caa8a0d01acc76abc9df36e6b432ad1e55\tbin\n';

const gitHistoryResult = [
    {
        author: 'Dmitry Andriyanov',
        hash: '90180910fc27a11272a3e5caeeb119a51e5c0545',
        msg: 'исправлена опечатка в readme',
        timestamp: '2018-10-16 12:49:56 +0300'
    },
    {
        author: 'Dmitry Andriyanov',
        hash: 'cc2284293758e32c50fa952da2f487c8c5e8d023',
        msg: 'readme',
        timestamp: '2018-10-16 12:36:32 +0300'
    },
    {
        author: 'Dmitry Andriyanov',
        hash: '7e013ae0440ad6e91082599376a6aaebe20d2112',
        msg: 'codestyle',
        timestamp: '2018-10-16 12:10:05 +0300'
    }
];

const gitFileTreeResult = [
    {
        hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
        path: '.gitignore',
        type: 'blob'
    },
    {
        hash: 'ead09676a936eb50ed700dad0d280d65c3df21d8',
        path: '.README.md',
        type: 'blob'
    },
    {
        hash: '70461d5f9009344d9933e889b0448aa3f18d83d9',
        path: 'app.js',
        type: 'blob'
    },
    {
        hash: '152db3caa8a0d01acc76abc9df36e6b432ad1e55',
        path: 'bin',
        type: 'tree'
    }
];

const page = 1;
const size = 20;
const offset = (page - 1) * size;
const gitHistoryArgs = [
    'log',
    '--pretty=format:%H%x09%an%x09%ad%x09%s',
    '--date=iso',
    '--skip',
    offset,
    '-n',
    size
];

const gitFileTreeArgs = {
    path: 'ls-tree',
    hash: '90180910fc27a11272a3e5caeeb119a51e5c0545'
};

describe('testing \'git\' util', () => {
    before(() => {
        sinon.stub(Git, 'executeGit')
            .withArgs(GIT_COMMAND, gitHistoryArgs).returns(Promise.resolve(gitHistoryData))
            .withArgs(GIT_COMMAND, Object.values(gitFileTreeArgs)).returns(Promise.resolve(gitFileTreeData));
    });

    describe('testing \'gitHistory\' function', () => {
        it('should return sorted array', async () => {
            const history = await Git.gitHistory(page, size);
            expect(history).to.deep.equal(gitHistoryResult);
        });
    });

    describe('testing \'gitFileTree\' function', () => {
        it('should return sorted array', async () => {
            const history = await Git.gitFileTree(gitFileTreeArgs.hash, '');
            expect(history).to.deep.equal(gitFileTreeResult);
        });
    });

    after(() => Git.executeGit.restore());
});
