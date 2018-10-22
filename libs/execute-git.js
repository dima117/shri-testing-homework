const { resolve } = require('path');
const REPO = resolve('.');

const { execFile } = require('child_process');

function executeGit(cmd, args, cwd = REPO, APIFunc = execFile) {
  return new Promise((resolve, reject) => {
    APIFunc(cmd, args, { cwd }, (err, stdout) => {
      if (err) {
        reject(err);
      }
      resolve(stdout.toString());
    });
  });
}

module.exports = executeGit
