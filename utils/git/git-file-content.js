const root = require('path').resolve('.')
const executeGit = require(root + '/libs/execute-git')

module.exports = function gitFileContent(hash) {
  return executeGit('git', ['show', hash]);
}