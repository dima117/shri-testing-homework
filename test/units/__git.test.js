const { expect } = require('chai');
const { gitHistoryMock, gitHistoryResultMock, gitFileTreeMock, gitFileTreeResultMock } = require('../../mocks');
const { gitHistory, gitFileTree } = require('../../utils/git');

describe('Ф-ция "gitHistory" должна', () => {
  it('возвращать корректное значение', async () => {
    const fakeExecuteGit = () => Promise.resolve(gitHistoryMock);

    const result = await gitHistory({ page: 1, size: 20 }, null, fakeExecuteGit);

    expect(result).to.deep.equal(gitHistoryResultMock);
  });
});

describe('Ф-ция "gitFileTree" должна', () => {
  it('возвращать корректное значение', async () => {
    const fakeExecuteGit = () => Promise.resolve(gitFileTreeMock);

    const result = await gitFileTree('hash', 'path', fakeExecuteGit);

    expect(result).to.deep.equal(gitFileTreeResultMock);
  });
});
