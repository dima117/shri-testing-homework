const {executeGit} = require('../model/gitModel');
const {parseFileTreeItem, parseHistoryItem} = require('../utils/gitParser');


[gitHistory,gitFileTree,gitFileContent].forEach(obj => obj.prototype.executeGit = executeGit);

function gitHistory(page = 1, size = 10) { //last argument is for test stub
    const offset = (page - 1) * size,
        params = ['log', '--pretty=format:%H%x09%an%x09%ad%x09%s',
            '--date=iso', '--skip', offset, '-n', size];
    return gitHistory.prototype.executeGit('git', params).then(data => {
        return data
            .split('\n')
            .filter(Boolean)
            .map(parseHistoryItem);
    });
}


function gitFileTree(hash, path) {
    const params = ['ls-tree', hash];
    path && params.push(path);

    return gitFileTree.prototype.executeGit('git', params).then(data => {
        return data
            .split('\n')
            .filter(Boolean)
            .map(parseFileTreeItem);
    });
}

function gitFileContent(hash) {
    return gitFileContent.prototype.executeGit('git', ['show', hash]);
}

module.exports = {
    gitHistory,
    gitFileTree,
    gitFileContent
};