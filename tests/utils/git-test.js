const expect = require('chai').expect;
const { gitHistory, gitFileTree, gitFileContent } = require('../../utils/git');

it('история коммитов соответствует истории коммитов в Git', async function () {
  // подготовка
  //фейковый вывод Git
  const fakeGitData = '90180910fc27a11272a3e5caeeb119a51e5c0545\tDmitry Andriyanov\t2018-10-16 12:49:56 +0300\tисправлена опечатка в readme';

  const gitFake = () => {
    return Promise.resolve(fakeGitData);
  };

  //действие
  const history = await gitHistory(1, 1, gitFake);
  const commit = history[0];

  //проверка
  expect(commit).to.deep.equal({
      hash: '90180910fc27a11272a3e5caeeb119a51e5c0545',
      author: 'Dmitry Andriyanov',
      timestamp: '2018-10-16 12:49:56 +0300',
      msg: 'исправлена опечатка в readme'
    }
  );

});