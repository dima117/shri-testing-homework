const chai = require('chai'),
    expect = chai.expect;

const {buildFolderUrl, buildFileUrl, buildObjectUrl} = require('../../app/utils/navigation');


describe('buildFolderUrl', () => {
    const testParentHash = 'cats',
        testPath = 'meow';

    it('should return path like /files/parentHash/path', () => {
        const result = buildFolderUrl(testParentHash, testPath);
        expect(result).to.be.equal(`/files/${testParentHash}/${testPath}`);
    });

    it('should return path like /files/parentHash/ w/o path specified', () => {
        const result = buildFolderUrl(testParentHash);
        expect(result).to.be.equal(`/files/${testParentHash}/`);
    });
});

describe('buildFileUrl', () => {
    const testParentHash = 'cats',
        testPath = 'meow';

    it('should return path like /content/parentHash/path', () => {
        const result = buildFileUrl(testParentHash, testPath);
        expect(result).to.be.equal(`/content/${testParentHash}/${testPath}`);
    });

});

describe('buildObjectUrl', () => {
    const testParentHash = 'cats',
        testPath = 'meow';

    it('should return path like /files/parentHash/path', () => {
        const testObj = {
                path: testPath,
                type: 'tree'
            },
            result = buildObjectUrl(testParentHash, testObj);
        expect(result).to.be.equal(`/files/${testParentHash}/${testPath}`);
    });

    it('should return path like /content/parentHash/', () => {
        const testObj = {
                path: testPath,
                type: 'blob'
            },
            result = buildObjectUrl(testParentHash, testObj);
        expect(result).to.be.equal(`/content/${testParentHash}/${testPath}`);
    });

    it('should return #', () => {
        const testObj = {
                path: testPath,
                type: 'qwerty'
            },
            result = buildObjectUrl(testParentHash, testObj);
        expect(result).to.be.equal('#');
    });
});
