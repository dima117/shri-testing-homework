let { expect } = require('chai');
let { GitWorkflow, GitWorkflowDep } = require('../utils/git');
let mocks = require('./mocks');
const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require("../utils/navigation");

class TestGitWorkflow extends GitWorkflow {
    constructor() {
        super();
        this.currentMock = null;
        this.mocks = mocks;
    }

    setCurrentMock(mockName) {
        this.currentMock = mockName;
    }

    getMock() {
        return this.mocks[this.currentMock].value
    }

    getAssert() {
        return this.mocks[this.currentMock].assert
    }
}

function MockFakeGitWorkflowDep(mock) {
    return {
        _executeGit(cmd, args) {
            return Promise.resolve(mock)
        }
    }
}


let gitWorkflow = new GitWorkflow();
const testGitWorkflow = new TestGitWorkflow();


describe('GitWorkflow block', function () {
    describe('executeGit', function () {
        it(`Корректно обрабатывает аргументы 'cmd', 'args'`, function (done) {
            const cmdTest = 'git';
            const argsTest = '--version';


            const fake = function (cmd, args) {
                expect(cmd).to.be.equal(cmdTest);
                expect(args).to.be.equal(argsTest);
                done();
            };

            const gitWorkFlowDep = new GitWorkflowDep(fake);
            gitWorkFlowDep._executeGit(cmdTest, argsTest);
        });
    });

    describe('gitHistory', function () {

        it(`Корректно обрабатывает аргументы 'page', 'size'`, function(done) {
            const page = Math.random()*(10 - 1) + 1;
            const size = Math.random()*(20 - 5) + 1;
            const offset = (page - 1) * size;
            function ArgFakeGitWorkflowDep(expect, done) {
                return {
                    _executeGit(cmd, args) {
                        expect(args).to.be.an('array').that.include(offset);
                        done();
                    }
                }
            }

            testGitWorkflow.setDependency(ArgFakeGitWorkflowDep(expect,done,offset));
            testGitWorkflow.gitHistory(page,size);
        });

        it('Корректно обрабатывает результаты от гита', function (done) {
            testGitWorkflow.setCurrentMock('gitHistory');
            const mock = testGitWorkflow.getMock();
            const fake = new MockFakeGitWorkflowDep(mock);
            testGitWorkflow.setDependency(fake);

            testGitWorkflow.gitHistory().then(history=> {
                    expect(history).to.deep.equal(testGitWorkflow.getAssert());
                    done();
                }
            )
        });
    });

    describe('gitFileTree', function() {

            it(`Корректно обрабатывает аргументы 'hash', 'path'`, function (done) {
                const hash = '123';
                const path = '/test1';
                function ArgFakeGitWorkflowDep(expect, done) {
                    return {
                        _executeGit(cmd, args) {
                            expect(args).to.be.an('array').that.include(hash);
                            expect(args).to.be.an('array').that.include(path);
                            done();
                        }
                    }
                }
                testGitWorkflow.setDependency(ArgFakeGitWorkflowDep(expect,done));
                testGitWorkflow.gitFileTree(hash, path);
            });

       it('Корректно обрабатывает результаты от гита', function(done) {
           testGitWorkflow.setCurrentMock('gitFileTree');
           const mock = testGitWorkflow.getMock();
           const fake = new MockFakeGitWorkflowDep(mock);
           testGitWorkflow.setDependency(fake);
           testGitWorkflow.gitFileTree().then(tree=> {
                   expect(tree).to.deep.equal(testGitWorkflow.getAssert());
                   done();
               }
           )
       })
    });

    describe('gitFileContent', function() {
       it(`Корректно обрабатывает аргумент 'hash'`, function (done) {
           const hash = 'hash';
           function ArgFakeGitWorkflowDep(expect, done) {
               return {
                   _executeGit(cmd, args) {
                       expect(args).to.be.an('array').that.include(hash);
                       done();
                   }
               }
           }
           testGitWorkflow.setDependency(ArgFakeGitWorkflowDep(expect, done));
           testGitWorkflow.gitFileContent(hash);
       })
    });
});

describe('Breadcrumbs block', function () {

    describe('buildFolderUrl', function () {
        it('Корректно составляет путь', function () {
            const parentHash = 'test1';
            const path = 'path';
            const result = buildFolderUrl(parentHash, path);

            expect(result).to.be.equal(`/files/${parentHash}/${path}`)
        });
    });

    describe('buildFileUrl', function () {
        it('Корректно составляет путь', function () {
            const parentHash = 'test1';
            const path = 'path';
            const result = buildFileUrl(parentHash, path);
            expect(result).to.be.equal(`/content/${parentHash}/${path}`)
        });
    });

    describe('buildBreadcrumbs', function () {

        it('По дефолту уже имеет первый начальный кусок bc', function () {
            expect(buildBreadcrumbs()).to.length.greaterThan(0);
        });

        it('Корректно составляет bc для ROOT папки конкретного коммита', function () {
            const hash = 'hash123';
            const bc = buildBreadcrumbs(hash);
            expect(bc).to.be.an('array').that.deep.include({ text: 'ROOT', href: undefined })
        });

        it('Корректно составляет bc при переходе в 10 подряд лежащих папок', function () {
            const hash = 'hash123';
            const folderName = 'folder';
            const bc = buildBreadcrumbs(hash, Array(10).fill(0).map((_, index)=>`${folderName}${index}`).join('/'));
            for(let i=0; i<bc.length - 2; i++) {
                expect(bc[i+1].href).to.contains(bc[i].href);
                if(i>1) {
                    expect(bc[i].text).to.equal(`${folderName}${i-2}`)
                }
            }
        });
    })
});