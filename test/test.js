const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

describe('utils block', function() {

    describe('private', function () {
        const { testApi } = require('../utils/git.js');
        const parseHist = testApi.parseHistoryItem;
        const parseTree = testApi.parseFileTreeItem;
        it('parseHistoryItem parse history correctly', function () {
            expect(parseHist('test hash\tcommit author\tcommit date\tcommit msg'))
            .to.eql({hash: 'test hash', author: 'commit author', timestamp: 'commit date', msg: 'commit msg'});
        });

        it('parseFileTreeItem parse file tree correctly', function () {
            expect(parseTree('testId testType testHash\ttest-file-name.test'))
            .to.eql({ type: 'testType', hash: 'testHash', path: 'test-file-name.test'});
        });
    });

    describe('git', function() {

        it('gitHistory', function() {
            const { gitHistory } = require('../utils/git');

            const stub = () => {
                return Promise.resolve('test hash\tcommit author\tcommit date\tcommit msg\ntest hash2\tcommit author2\tcommit date2\tcommit msg2\n');
            };

            this.gitHistory = (a,b,stub) => { return new gitHistory(a,b,stub); };

            const result = [{hash: 'test hash', author: 'commit author', timestamp: 'commit date', msg: 'commit msg'},
                            {hash: 'test hash2', author: 'commit author2', timestamp: 'commit date2', msg: 'commit msg2'}]

            return this.gitHistory(1,2,stub).then(
                history => { expect(history).to.eql(result); }
            );
        });

        it('gitFileTree correct parse file', function() {
            const { gitFileTree } = require('../utils/git');

            const stub = () => {
                return Promise.resolve('testId testType testHash\ttest/testFilePath.test\n');
            };

            this.gitFileTree = (a,b,stub) => { return new gitFileTree(a,b,stub); };

            const result = { type: 'testType', hash: 'testHash', path: 'test/testFilePath.test' };

            return this.gitFileTree(true,true,stub).then(
                ([tree]) => { expect(tree).to.eql(result); }
            );
        });

        it('gitFileTree correct parse multiple paths', function() {
            const { gitFileTree } = require('../utils/git');

            const stub = () => {
                return Promise.resolve('testId testType testHash\ttest/testFilePath.test\ntestId2 testType2 testHash2\ttest/testFilePath2\n');
            };

            this.gitFileTree = (a,b,stub) => { return new gitFileTree(a,b,stub); };

            const result = [{ type: 'testType', hash: 'testHash', path: 'test/testFilePath.test' },
                            { type: 'testType2', hash: 'testHash2', path: 'test/testFilePath2' }];

            return this.gitFileTree(true,true,stub).then(
                tree => { expect(tree).to.eql(result); }
            );
        });
    });

    describe('navigation', function() {
        const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('../utils/navigation');
        it('buildFolderUrl correct with path', function() {
            expect(buildFolderUrl('testHash', 'testPath')).to.eql('/files/testHash/testPath');
        });

        it('buildFolderUrl correct without path', function() {
            expect(buildFolderUrl('testHash')).to.eql('/files/testHash/');
        });

        it('buildFileUrl', function() {
            expect(buildFileUrl('testHash', 'testPath.test')).to.eql('/content/testHash/testPath.test');
        });

        describe('breadcrumbs', function () {
            it('buildBreadcrumbs - base level (no data)', function() {
                expect(buildBreadcrumbs()).to.eql([{ text: 'HISTORY', href: undefined }]);
            });

            it('buildBreadcrumbs - commit level (with hash)', function() {
                expect(buildBreadcrumbs('testHash')).to.eql([{ text: 'HISTORY', href: '/' }, { text: 'ROOT', href: undefined}]);
            });

            it('buildBreadcrumbs - core file level (with hash and filename)', function() {
                expect(buildBreadcrumbs('testHash', 'testFile.test')).to.eql([{ text: 'HISTORY', href: '/' }, { text: 'ROOT', href: '/files/testHash/'}, {text: 'testFile.test'}]);
            });

            it('buildBreadcrumbs - core folder level (with hash and folder)', function() {
                expect(buildBreadcrumbs('testHash', 'testFolder')).to.eql([{ text: 'HISTORY', href: '/' }, { text: 'ROOT', href: '/files/testHash/'}, {text: 'testFolder'}]);
            });

            it('buildBreadcrumbs - inner folder level (with hash and folder/folder)', function() {
                expect(buildBreadcrumbs('testHash', 'testFolder/testInnerFolder')).to.eql([{ text: 'HISTORY', href: '/' }, { text: 'ROOT', href: '/files/testHash/'}, {text: 'testFolder', href: '/files/testHash/testFolder/'}, {text: 'testInnerFolder'}]);
            });
        });
    });
});

describe('controllers block', function() {
    describe('index', function() {
        const index = require('../controllers/indexController');
        this.index = new index();

        /**
         * все остальные задействованные методы мы проверили ранее,
         * потому здесь просто заменяем их заглушками с соответствующими параметрами
         */
        it('adds href to list', async () => {
            const thisBuildList = this.index.buildList;

            this.index.gitHistory = () => {
                return Promise.resolve([{stuff: 'stuff', hash: 'testHash' }]);
            };
            this.index.buildFolderUrl = (hash, path) => {
                return `/files/${hash}/${path}`;
            };

            let list;
            await thisBuildList().then(res => list = res);

            const result = {href: '/files/testHash/'};

            expect(list[0]).to.include(result)
        });
    });

    describe('content', function() {
        const content = require('../controllers/contentController');
        this.content = new content();

        this.content.gitFileTree = (hash, path) => {
            return Promise.resolve(
                [{
                    type: 'blob',
                    hash: hash,
                    path: path
                }]
            );
        }

        this.content.gitFileContent = () => {
            return Promise.resolve('test content');
        };

        this.content.buildBreadcrumbs = (hash, path) => {
            return [
                { text: 'HISTORY', href: '/' },
                { text: 'ROOT', href: '/files/' + hash + '/' },
                { text: path }
            ]
        }

        it('build file data for render', async () => {
            const buildRenderData = this.content.buildRenderData;


            let render;
            await buildRenderData('test_hash', [ '.gitignore' ]).then(res => render = res);

            const result = {
                title: 'content',
                breadcrumbs: [
                        { text: 'HISTORY', href: '/' },
                        { text: 'ROOT', href: '/files/test_hash/' },
                        { text: '.gitignore' }
                ],
                content: 'test content'
            };

            expect(render).to.eql(result);
        });
    });

    describe('files', function() {
        it('test name', function () {
            assert.equal(1,1);
        });
    });
});