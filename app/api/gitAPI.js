const {executeGit} = require('../model/gitModel');
const {parseFileTreeItem, parseHistoryItem} = require('../utils/gitParser');

function gitHistory(page = 1, size = 10, execGit = executeGit) { //last argument is for test stub
    const offset = (page - 1) * size,
        params = ['log', '--pretty=format:%H%x09%an%x09%ad%x09%s',
            '--date=iso', '--skip', offset, '-n', size];
    return execGit('git', params).then(data => {
        return data
            .split('\n')
            .filter(Boolean)
            .map(parseHistoryItem);
    });
}


function gitFileTree(hash, path, execGit = executeGit) {
    const params = ['ls-tree', hash];
    path && params.push(path);

    return execGit('git', params).then(data => {
        return data
            .split('\n')
            .filter(Boolean)
            .map(parseFileTreeItem);
    });
}

function gitFileContent(hash, execGit = executeGit) {
    return execGit('git', ['show', hash]);
}

module.exports = {
    gitHistory,
    gitFileTree,
    gitFileContent
};