const { changeExecFile, gitHistory, gitFileTree, gitFileContent } = require('../../../utils/git');
const fs = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(fs.readFile);

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const expect = chai.expect;

describe('Получение истории коммитов', () => {
  it('20 последних коммитов', async () => {

    //подготовка
    changeExecFile((a, b, c, f) => {
      readFileAsync('tests/unit/data/history.txt')
        .then(data => f(null, data))
        .catch(err => f(err, null))
    });

    //действие
    const history = await gitHistory(1, 20);

    //проверка
    const data = await readFileAsync('tests/unit/data/history.json');
    expect(history).to.eql(JSON.parse(data));
  });

  it('ошибка получения коммитов', () => {
    //подготовка
    changeExecFile((a, b, c, f) => f('error', ''));

    //действие
    const history = gitHistory(1, 20);

    //проверка
    return expect(history).to.eventually.rejected;
  });

});


describe('Получение списка файлов', () => {
  it('список файлов', async () => {

    //подготовка
    changeExecFile((a, b, c, f) => {
      readFileAsync('tests/unit/data/list.txt')
        .then(data => f(null, data))
        .catch(err => f(err, ''))
    });

    //действие
    const list = await gitFileTree('90180910fc27a11272a3e5caeeb119a51e5c0545', 'controllers/');

    //проверка
    const data = await readFileAsync('tests/unit/data/list.json');
    expect(list).to.eql(JSON.parse(data));
  });


  it('ошибка получения списка', () => {
    //подготовка
    changeExecFile((a, b, c, f) => f('error', ''));

    //действие
    const list = gitFileTree('90180910fc27a11272a3e5caeeb119a51e5c0545', 'controllers/');

    //проверка
    return expect(list).to.eventually.rejected;
  });
});

describe('Получение содержимого файла', () => {
  it('содержимое файла', async () => {

    //подготовка
    changeExecFile((a, b, c, f) => {
      readFileAsync('tests/unit/data/content.txt')
        .then(data => f(null, data))
        .catch(err => f(err, ''))
    });

    //действие
    const content = await gitFileContent('ead09676a936eb50ed700dad0d280d65c3df21d8');

    //проверка
    const data = await readFileAsync('tests/unit/data/content.txt');
    expect(content).to.eql(data.toString());
  });


  it('ошибка получения содержимого файла', () => {
    //подготовка
    changeExecFile((a, b, c, f) => f('error', ''));

    //действие
    const content = gitFileContent('ead09676a936eb50ed700dad0d280d65c3df21d8');

    //проверка
    return expect(content).to.eventually.rejected;
  });
});