const { executeGit, parseHistoryItem } = require('../../utils/git');
const expect = require('chai').expect;

describe('История коммитов',function () {
    it('Git команда успешно выполняется', async function () {
        const result = await executeGit('git', ['log']);
        console.log(result)
      //  expect(result).to.equal('fatal: no pattern given.');
    });

    it('Возвращает объект с валидными hash, author, timestamp, msg', function () {
         const line = 'somehash\tsomeauthor\tsometimestamp\tsomemsg';

         const parsedLine = parseHistoryItem(line);

         expect(parsedLine).to.have.property('hash').with.equal('somehash');
         expect(parsedLine).to.have.property('author').with.equal('someauthor');
         expect(parsedLine).to.have.property('timestamp').with.equal('sometimestamp');
         expect(parsedLine).to.have.property('msg').with.equal('somemsg');
    });
});
