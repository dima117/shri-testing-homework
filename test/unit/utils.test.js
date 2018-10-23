const {parseFileTreeItem, parseHistoryItem} = require('../../utils/git');
const {expect} = require('chai');

describe('Git utilities', function () {

    it('Should be return valid tree', function(done) {
        const line = '100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8\t.gitignore';
        const treeItem = parseFileTreeItem(line);
        const result = {
            type: 'blob',
            hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
            path: '.gitignore'
        };

        expect(treeItem).to.deep.equal(result);
        done();
    });

    it('Should be return valid commit information', function(done) {
        const line = '722c10cd41cd88127d396a764d4120a7825581c1\tsmyskov\t2018-10-22 10:51:03 +0300\tUpdate README.md';
        const historyItem = parseHistoryItem(line);
        const result = {
            hash: '722c10cd41cd88127d396a764d4120a7825581c1',
            author: 'smyskov',
            timestamp: '2018-10-22 10:51:03 +0300',
            msg: 'Update README.md'
        };

        expect(historyItem).to.deep.equal(result);
        done();
    });

})
