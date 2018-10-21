
const { buildFolderUrl, buildFileUrl, buildBreadcrumbs } = require('../utils/navigation');
const { expect } = require('chai');

const testHash = "90180910fc27a11272a3e5caeeb119a51e5c0545";
const testPath = "/utils/navigation.js";

const normalizedPath = (path) => {
    return (path || '').split('/').filter(Boolean);
};

const getCurrentPath = (normalizedPath) => {
    return normalizedPath.slice(-1);
};

describe("utils/navigation.js", () => {
    describe("buildFolderUrl", () => {
        it("test buildFolderUrl, return a !empty string", () => {
            const result = buildFolderUrl(testHash, testPath);
            expect(result).to.be.a('string').with.to.not.equal("");
        });

        it("get folder URL with args: hash && path", () => {
            const result = buildFolderUrl(testHash, testPath);
            expect(result).to.equal(`/files/${testHash}/${testPath}`);
        });

        it("get folder URL with args: hash", () => {
            const result = buildFolderUrl(testHash, undefined);
            expect(result).to.equal(`/files/${testHash}/`);
        });
    });

    describe("buildFileUrl", () => {
        it("test buildFileUrl, return a !empty string", () => {
            const result = buildFileUrl(testHash, testPath);
            expect(result).to.be.a('string').with.to.not.equal("");
        });

        it("get file URL with args: hash && path", () => {
            const result = buildFileUrl(testHash, testPath);
            expect(result).to.equal(`/content/${testHash}/${testPath}`);
        });
    });

    describe("buildBreadcrumbs", () => {

        describe("without args", () => {
            it("array length must be 1", () => {
                const result = buildBreadcrumbs();
                expect(result).to.be.a('array').with.to.have.lengthOf(1);
            });

            it("should return the first element of the array with the text key HISTORY", () => {
                const result = buildBreadcrumbs();
                expect(result[0]).to.deep.equal({
                    text: 'HISTORY',
                    href: undefined
                });
            });
        });

        describe("only with args: hash", () => {
            it("array length must be 2", () => {
                const result = buildBreadcrumbs(testHash);
                expect(result).to.be.a('array').with.to.have.lengthOf(2);
            });

            it("result[0].href must be '/'", () => {
                const result = buildBreadcrumbs(testHash);
                expect(result[0].href).to.deep.equal("/");
            });

            it("should return the second element of the array with the key ROOT", () => {
                const result = buildBreadcrumbs(testHash);
                expect(result[1]).to.deep.equal({
                    text: 'ROOT',
                    href: undefined
                });
            });
        });

        describe("with args: hash && path", () => {

            it("must return result[1].href equal /files/${hash}/${fullPath}", () => {
                const result = buildBreadcrumbs(testHash, testPath);
                expect(result[1]).to.deep.equal({
                    text: 'ROOT',
                    href: `/files/${testHash}/`
                });
            });

            it("check length exist array by path.legth", () => {
                const result = buildBreadcrumbs(testHash, testPath);
                expect(result).to.have.lengthOf(normalizedPath(testPath).length + 2);
            });

            it("result[length-1].text must be a equal normalizedPath(testPath).slice(-1) ", () => {
                const result = buildBreadcrumbs(testHash, testPath);
                const resultLength = result.length;
                const [currentName] = getCurrentPath(normalizedPath(testPath));
                expect(result[resultLength - 1]).to.deep.equal({
                    text: currentName
                });
            });
        });

    });
});

