const root = require('path').resolve('.')
const executeGit = require(root + '/libs/execute-git')

module.exports = function gitFileContent(hash, gitExecuter = executeGit) {
  return gitExecuter('git', ['show', hash]);
}
