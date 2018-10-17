const {
    parseHistoryItem,
    parseFileTreeItem,
    parseLog
} = require('./git');

const { expect } = require('chai');

describe('git.js', () => {
    it('should parse git history', () => {
        // Create config vars
        const times = 10;
        const [hash, author, timestamp, msg] = ['h', 'a', 't', 'm'];

        // Create git log data
        const table = `${hash}\t${author}\t${timestamp}\t${msg}\n`.repeat(times);
        
        // Create var, with whose we will behinded
        const res = (new Array(times)).fill({
            author,
            hash,
            msg,
            timestamp
        });

        // Test result with tested value
        // Test function parseHistoryItem
        expect(res).to.deep.eq(parseLog(table, parseHistoryItem));
    });

    it('should parse file tree item', () => {
        // Create config vars
        const times = 10;
        const [hash, path, type] = ['h', 'p', 't'];

        // Create git log data
        const table = `any ${type} ${hash}\t${path}\t${type}\n`.repeat(times);
        
        // Create var, with whose we will behinded
        const res = (new Array(times)).fill({
            path,
            type,
            hash
        });
        
        // Test result with tested value
        // Test function parseFileTreeItem
        expect(res).to.deep.eq(parseLog(table, parseFileTreeItem));
    });
});