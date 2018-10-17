const { gitFileContent, gitFileTree, gitHistory } = require('./../../utils/git');
const { resolve } = require('path');
const { execFile } = require('child_process');
const expect = require('chai').expect;
const REPO = resolve('.');

describe('utils/git', () => {
  it('gitFileContent: возвращает корректный контент по хэшу коммита', async () => {
    const output = await new Promise((resolve, reject) => {
      execFile('git', ['show', '90180910fc27a11272a3e5caeeb119a51e5c0545'], { cwd: REPO }, (err, stdout) => {
        if (err) {
          reject(err);
        }

        resolve(stdout.toString());
      });
    });

    const result = await gitFileContent('90180910fc27a11272a3e5caeeb119a51e5c0545')

    expect(result).to.equal(output)
  })

  it('gitHistory: возвращает корректное количество записей', async () => {
    const history = await gitHistory(1 , 5);

    expect(history.length).to.equal(5)
  })
})