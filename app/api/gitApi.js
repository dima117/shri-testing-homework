const {executeGit} = require('../model/gitModel');
const {parseFileTreeItem, parseHistoryItem} = require('../utils/gitParser');



class GitApi {
    constructor() {
        this.executeGit = executeGit;

    }

    gitHistory(page = 1, size = 10) {
        const offset = (page - 1) * size,
            params = ['log', '--pretty=format:%H%x09%an%x09%ad%x09%s',
                '--date=iso', '--skip', offset, '-n', size];
        return this.executeGit('git', params).then(data => {
            return data
                .split('\n')
                .filter(Boolean)
                .map(parseHistoryItem);
        });
    }


    gitFileTree(hash, path) {
        const params = ['ls-tree', hash];
        path && params.push(path);

        return this.executeGit('git', params).then(data => {

            return data
                .split('\n')
                .filter(Boolean)
                .map(parseFileTreeItem);
        });
    }

    gitFileContent(hash) {
        return this.executeGit('git', ['show', hash]);
    }
}


module.exports = {
    GitApi
};