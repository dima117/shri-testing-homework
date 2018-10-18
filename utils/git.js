const { resolve } = require('path')
const REPO = resolve('.')

const { execFile } = require('child_process')

function executeGit(cmd, args) {
    return new Promise((resolve, reject) => {
        execFile(cmd, args, { cwd: REPO }, (err, stdout) => {
            if (err) {
                reject(err)
            }
            resolve(stdout.toString())
        })
    })
}

class myGit {
    constructor() {
        this.executeGit = executeGit
    }

    parseHistoryItem(line) {
        const [hash, author, timestamp, msg] = line.split('\t')

        return {
            hash,
            author,
            timestamp,
            msg
        }
    }

    gitHistory(page = 1, size = 10) {
        const offset = (page - 1) * size

        return this.executeGit('git', [
            'log',
            '--pretty=format:%H%x09%an%x09%ad%x09%s',
            '--date=iso',
            '--skip',
            offset,
            '-n',
            size
        ]).then(data => {
            console.log(data)
            return data
                .split('\n')
                .filter(Boolean)
                .map(parseHistoryItem)
        })
    }

    parseFileTreeItem(line) {
        const [info, path] = line.split('\t')
        const [, type, hash] = info.split(' ')

        return { type, hash, path }
    }

    gitFileTree(hash, path) {
        const params = ['ls-tree', hash]
        path && params.push(path)

        return this.executeGit('git', params).then(data => {
            return data
                .split('\n')
                .filter(Boolean)
                .map(parseFileTreeItem)
        })
    }

    gitFileContent(hash) {
        return this.executeGit('git', ['show', hash])
    }

    addOneToEach(arr) {
        return arr.map(item => 1 + item)
    }

    sumNumbers(arr) {
        return arr.reduce((acc, item) => acc + item)
    }
}
module.exports = { myGit }
//

// module.exports = {addOneToEach, sumNumbers}
