const {execFile} = require('child_process');
const {resolve} = require('path');
const REPO = resolve('.');

function executeGit(cmd, args) {
    return new Promise((resolve, reject) => {
        execFile(cmd, args, {
            cwd: REPO
        }, (err, stdout) => {
            if (err) {
                reject(err);
            }
            
            resolve(stdout.toString());
        });
    });
}

module.exports = {
    executeGit
};