const { resolve } = require('path');
const REPO = resolve('.');
const { execFile } = require('child_process');

class gitModule {

    constructor(exec = this.executeGit){
        this.exec = exec;
    }

    executeGit(cmd, args) {
        return new Promise((resolve, reject) => {
            execFile(cmd, args, { cwd: REPO }, (err, stdout) => {
                if (err) {
                    reject(err);
                }

                resolve(stdout.toString());
            });
        });
    }

    parseHistoryItem(line) {
        const [hash, author, timestamp, msg] = line.split('\t');

        return {
            hash,
            author,
            timestamp,
            msg
        };
    }

    gitHistory(offset = 0, size = 10){
        return this.exec('git', [
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
                .map(this.parseHistoryItem);
        });
    }

    parseFileTreeItem(line) {
        const [info, path] = line.split('\t');
        const [, type, hash] = info.split(' ');

        return { type, hash, path };
    }

    gitFileTree(hash, path) {
        const params = ['ls-tree', hash];
        path && params.push(path);

        return this.exec('git', params).then(data => {
            return data
                .split('\n')
                .filter(Boolean)
                .map(this.parseFileTreeItem);
        });
    }

    gitFileContent([file]) {
        if (file && file.type === 'blob') {
            return this.exec('git', ['show', file.hash]);
        }
    }

}

module.exports = {
    gitModule
};
