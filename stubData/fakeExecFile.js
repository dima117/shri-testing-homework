const { execFile } = require('child_process');
const fs = require("fs");

module.exports = function(cmd, args, options, callback) {
  const clearArgs = args.join('-').replace(/\//g, '-');
  const fileName = `./stubData/${cmd} ${clearArgs}.txt`;

  if (fs.existsSync(fileName)) {
    fs.readFile(fileName, (error, stdout) => callback(null, stdout));
  } else {
    execFile(cmd, args, options, (err, stdout) => {
      fs.writeFile(fileName, stdout, () => callback(null, stdout));
    });
  }
};
