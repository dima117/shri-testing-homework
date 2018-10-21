const { resolve } = require('path');
const REPO = resolve('.');

const { execFile } = require('child_process');

module.exports = function (rep) {
    this.REPO = rep || REPO;

    this.executeGit = function (args) {
        return new Promise((resolve, reject) => {
            execFile('git' , args, { cwd: this.REPO }, (err, stdout) => {
                if (err) {
                    reject(err);
                }

                resolve(stdout.toString());
            });
        });
    }

    this.parseHistoryItem = function (line) {
        const [hash, author, timestamp, msg] = line.split('\t');

        return {
            hash,
            author,
            timestamp,
            msg
        };
    }

    this.gitHistory = function (page = 1, size = 10) {
        const offset = (page - 1) * size;

        return this.executeGit([
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

    this.parseFileTreeItem = function (line) {
        const [info, path] = line.split('\t');
        const [, type, hash] = info.split(' ');

        return { type, hash, path };
    }

    this.gitFileTree = function (hash, path) {
        const params = ['ls-tree', hash];
        path && params.push(path);

        return this.executeGit(params).then(data => {
            return data
                .split('\n')
                .filter(Boolean)
                .map(this.parseFileTreeItem);
        });
    }

    this.gitFileContent = function (hash) {
        return this.executeGit(['show', hash]);
    }
}
