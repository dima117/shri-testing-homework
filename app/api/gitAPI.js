const {executeGit} = require( '../model/gitModel');
const { parseFileTreeItem, parseHistoryItem } = require('../utils/gitParser');

function gitHistory(page = 1, size = 10) {
    const offset = (page - 1) * size;

    return executeGit('git', [
        'log',
        '--pretty=format:%H%x09%an%x09%ad%x09%s',
        '--date=iso',
        '--skip',
        offset,
        '-n',
        size
    ]).then(data => {
        return data
            .split('\n')
            .filter(Boolean)
            .map(parseHistoryItem);
    });
}


function gitFileTree(hash, path) {
    const params = ['ls-tree', hash];
    path && params.push(path);

    return executeGit('git', params).then(data => {
        return data
            .split('\n')
            .filter(Boolean)
            .map(parseFileTreeItem);
    });
}

function gitFileContent(hash) {
    return executeGit('git', ['show', hash]);
}

module.exports = {
    gitHistory,
    gitFileTree,
    gitFileContent
};