const { changeExecFile } = require('../utils/git');
let { execFile } = require('child_process');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

changeExecFile((a, b, c, f) => {
  if (b[0] === 'log') {
    readFileAsync('./tests/unit/data/history.txt').then(data => f(null, data));
  } else {
    execFile(a, b, c, f);
  }
});

require('../app');