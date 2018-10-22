const gitLog = `
112233	user1	2018-10-16	commit message 1
332211	user1	2018-10-15	commit message 2
`;
const fakeHistoryExec = () => Promise.resolve(gitLog);
const fakeTreeExec = () => Promise.resolve('100644 blob 112233	bin/www');
const HASH = '38429bed94bd7c107c65fed6bffbf443ff0f4183';
const BIN_HASH = '8b4a09f575b860abf8076352354858d8e9f3a617';
const PATH = 'bin/www';

module.exports = {
  fakeHistoryExec,
  fakeTreeExec,
  HASH,
  BIN_HASH,
  PATH
}
