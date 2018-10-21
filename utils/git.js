const { resolve } = require('path');
const REPO = resolve('.');
const { promisify } = require('util');
const { execFile } = require('child_process');
const execFileAsync = promisify(execFile);

function parseHistoryItem(line) {
    const [hash, author, timestamp, msg] = line.split('\t');

    return {
        hash,
        author,
        timestamp,
        msg
    };
}
function parseFileTreeItem(line) {
    const [info, path] = line.split('\t');
    const [, type, hash] = info.split(' ');

    return { type, hash, path };
}




class GitWorkflowDep {

    constructor(execFileFunction) {
        this.execFileFunction = execFileFunction || execFileAsync;
    }
        _executeGit(cmd, args) {
            return this.execFileFunction(cmd, args, { cwd: REPO }).then((result) => {
                    return result.stdout.toString();
                }).catch((err)=> {
                    console.log(err)
                });
        }
}

class GitWorkflow {

    constructor() {
        this.extDependency = new GitWorkflowDep();

        this.gitHistory = this.gitHistory.bind(this);
        this.gitFileTree = this.gitFileTree.bind(this);
        this.gitFileContent = this.gitFileContent.bind(this);

    }
    setDependency(dependency) {
          let oldDep = {...this.extDependency};
          this.extDependency = {
              ...oldDep, ...dependency
          }
    }

    gitHistory(page = 1, size = 10) {
        const offset = (page - 1) * size;

        return this.extDependency._executeGit('git', [
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
    };

    gitFileTree(hash, path) {
        const params = ['ls-tree', hash];
        path && params.push(path);

        return this.extDependency._executeGit('git', params).then(data => {
            return data
                .split('\n')
                .filter(Boolean)
                .map(parseFileTreeItem);
        });
    }

    gitFileContent(hash) {
        return this.extDependency._executeGit('git', ['show', hash]);
    }
}

const gitWorkflow = new GitWorkflow();

module.exports = {
  gitHistory: gitWorkflow.gitHistory,
  gitFileTree: gitWorkflow.gitFileTree,
  gitFileContent: gitWorkflow.gitFileContent,
  GitWorkflow: GitWorkflow,
  GitWorkflowDep: GitWorkflowDep,
};
