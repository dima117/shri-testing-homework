const fileContentHash = {};
const fs = require('fs');
const { normalize } = require('path');

const hashes = [
  'aa45e21c29a47bba4c8428e62311df5b563ee15d'
];

hashes.forEach(hash => {
  const content =
      fs.readFileSync(normalize(`${__dirname}/files/${hash}.txt`), 'utf8');

  fileContentHash[hash] = content;
});

module.exports = fileContentHash;
