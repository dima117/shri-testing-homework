const chai = require('chai'),
    expect = chai.expect;

const {parseFileTreeItem, parseHistoryItem} = require('../../utils/gitParser');


describe('parseFileTreeItem', () => {
    const testLine = '100644 blob 27e5864fa4f9a15d22ef81a804ca339fa4befbcd\tREADME.md';

    it('should return type, hash and path of commit', () => {
        const {type, hash, path} = parseFileTreeItem(testLine);
        expect([type, hash, path]).to.include.ordered.members(
            ['blob',
                '27e5864fa4f9a15d22ef81a804ca339fa4befbcd',
                'README.md']);
    });
});

describe('parseHistoryItem', () => {
    const testLine = 'cc2284293758e32c50fa952da2f487c8c5e8d023\tDmitry Andriyanov\t2018-10-16 12:36:32 +0300\treadme';

    it('should return hash, author, timestamp and msg of commit', () => {
        const {hash, author, timestamp, msg} = parseHistoryItem(testLine);
        expect([hash, author, timestamp, msg]).to.include.ordered.members(
            ['cc2284293758e32c50fa952da2f487c8c5e8d023',
                'Dmitry Andriyanov',
                '2018-10-16 12:36:32 +0300',
                'readme']);
    });
});

