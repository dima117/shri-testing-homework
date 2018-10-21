const { Git } = require('../utils/git');
const git = new Git();
const { expect } = require('chai');

const testGitHistoryExecFile = `
90180910fc27a11272a3e5caeeb119a51e5c0545\tDmitry Andriyanov\t2018-10-16 12:49:56 +0300\tисправлена опечатка в readme
cc2284293758e32c50fa952da2f487c8c5e8d023\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme
7e013ae0440ad6e91082599376a6aaebe20d2112\tDmitry Andriyanov\t2018-10-16 12:10:05 +0300\tcodestyle`;

const testGitHistotyExecObj = [
    {
        hash: '90180910fc27a11272a3e5caeeb119a51e5c0545',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 12:49:56 +0300',
        msg: 'исправлена опечатка в readme'
    },
    {
        hash: 'cc2284293758e32c50fa952da2f487c8c5e8d023',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 12:36:32 +0300',
        msg: 'readme'
    },
    {
        hash: '7e013ae0440ad6e91082599376a6aaebe20d2112',
        author: 'Dmitry Andriyanov',
        timestamp: '2018-10-16 12:10:05 +0300',
        msg: 'codestyle'
    }
];

describe("utils/git.js", () => {

    describe("gitHistory", () => {
        beforeEach(() => {
            git.executeGit = () => {
                return Promise.resolve(testGitHistoryExecFile);
            };
        });

        it("return must be array with no params and params", async () => {
            const result = await git.gitHistory();
            expect(result).to.be.an("array");
        });

        it("must return full array of commits", async () => {
            const result = await git.gitHistory(1, 2);
            expect(result).to.be.deep.equal(testGitHistotyExecObj);
        });
    });

    describe("parseFileTreeItem", () => {
        it("must parse object from string, return object", () => {
            const testLine = "100644 blob 70461d5f\tapp.js";
            const exitObj = {
                type: "blob",
                hash: "70461d5f",
                path: "app.js"
            };
            const result = git.parseFileTreeItem(testLine);
            expect(result).to.be.deep.equal(exitObj);
        });
    });

    describe("parseHistoryItem", () => {
        it("must parse object from string, return object", () => {
            const testLine = testGitHistoryExecFile.split("\n").filter(Boolean)[0];
            const exitObj = testGitHistotyExecObj[0];
            const result = git.parseHistoryItem(testLine);
            expect(result).to.be.deep.equal(exitObj)
        });
    });

    describe("gitFileTree", () => {
        beforeEach(() => {
            git.executeGit = () => {
                return Promise.resolve("1 blob 90180910fc27\t/path");
            };
        });

        it("getFileTree witout path", async () => {
            const result = await git.gitFileTree("90180910fc27", "/path");
            expect(result).to.be.deep.equal([{
                "type": "blob",
                "hash": "90180910fc27",
                "path": "/path"
            }]);
        });
    });

});
