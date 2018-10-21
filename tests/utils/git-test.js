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

it('в Git отправлены правильные параметры', async function () {
  // подготовка
    let params;

    const gitFake = (...args) => {
    params = args;
    return Promise.resolve('');
  };

  //действие
  const history = await gitHistory(1, 5, gitFake);
  const [ cmd, flags ] = params;

  //проверка
  expect(cmd).to.equal('git');

  expect(flags[0]).to.equal('log');
  expect(flags).to.include('--pretty=format:%H%x09%an%x09%ad%x09%s');
  expect(flags).to.include('--date=iso');

  const countIndex = flags.indexOf('-n') + 1;
  const skipIndex = flags.indexOf('--skip') + 1;

  expect(flags[skipIndex]).to.equal(0);
  expect(flags[countIndex]).to.equal(5);

});


