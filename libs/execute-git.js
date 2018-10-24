const { resolve } = require('path');
const REPO = resolve('.');

const child_process = require('child_process');

function executeGit(cmd, args, cwd = REPO) {
  return new Promise((resolve, reject) => {
    child_process.execFile(cmd, args, { cwd }, (err, stdout) => {
      if (err) {
        reject(err);
      }
      resolve(stdout.toString());
    });
  });
}

module.exports = executeGit
