const { gitFileContent, gitFileTree, gitHistory } = require('../../../utils/git');
const expect = require('chai').expect;

describe('utils/git', () => {

  describe('gitFileContent', () => {
    it('вызывает корректную git команду для получения контента', async () => {
      const output = 'git show 90180910fc27a11272a3e5caeeb119a51e5c0545';

      gitFileContent._executeFileFake = (...args) => {
        const command = `${args[0]} ${args[1].join(' ')}`;
        return args[3](null, command);
      }

      const result = await gitFileContent('90180910fc27a11272a3e5caeeb119a51e5c0545')

      expect(result).to.equal(output)
    })
  })

  describe('gitHistory', () => {
    it('возвращает корректное количество записей', async () => {
      gitHistory._executeFileFake = null;

      const history = await gitHistory(1 , 5);

      expect(history.length).to.equal(5)
    })
  });

})