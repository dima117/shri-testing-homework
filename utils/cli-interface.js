const { resolve } = require('path');
const { execFile } = require('child_process');

const currentFolder = resolve('.');

/**
 * Runs shell command with arguments passed and returns it's output as a string.
 * @param {string} cmd
 * @param {string[]} args
 * @return {Promise<string>}
 */
function executeCliCommand(cmd, args) {
  return new Promise((resolve, reject) => {
    execFile(
        cmd,
        args,
        { cwd: currentFolder },
        (err, stdout) => {
          if (err) {
            reject(err);
          }

          resolve(stdout.toString());
        });
  });
}

module.exports = executeCliCommand;
