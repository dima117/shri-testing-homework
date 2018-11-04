const GitUtil = require('../../utils/git');
const PATH = './test-repository';
const git = new GitUtil(PATH);
const expect = require('chai').expect;

describe('Выполнение git команд и обработка входных/выходных данных для них', function () {

    it('parseHistoryItem() - Парсит значения коммита и возвращает объект с ними', function () {
        const line = 'somehash\tsomeauthor\tsometimestamp\tsomemsg';
        const hash = 'somehash';
        const author = 'someauthor';
        const timestamp = 'sometimestamp';
        const msg = 'somemsg';

        const result = git.parseHistoryItem(line);

        expect(result).to.eql({
            hash,
            author,
            timestamp,
            msg
        });
    });

    it('gitHistory() - Возвращает корректную историю коммитов тестового репозитория', async function () {
        const commitsHistory = await git.gitHistory();

        expect(commitsHistory).to.eql([
            {
                hash: 'ae9dfcb7d7e823a9b3f2406678165ceea09dc0fe',
                author: 'Arsen',
                timestamp: '2018-10-22 16:27:03 +0300',
                msg: 'added nested folder',
            },
            {
                hash: '1f78f3b14096667c70de44f7025d363614343f17',
                author: 'Arsen',
                timestamp: '2018-10-21 22:16:44 +0300',
                msg: 'change 1'
            },
            {
                hash: '2af43ce7c800cc6d7f47de9ec79d8535b73db55e',
                author: 'Arsen',
                timestamp: '2018-10-21 21:02:17 +0300',
                msg: 'first commit'
            }
        ]);
    });

    it('gitFileTree() - Возвращает корректную структуру файлов тестового репозитория', async function () {
        const hash = '1f78f3b14096667c70de44f7025d363614343f17';
        const path = '';

        const fileTree = await git.gitFileTree(hash, path);

        expect(fileTree).to.eql([
            {
                type: 'blob',
                hash: '818b46f5a3570484c229ae09f2cd76ac8c0e1d36',
                path: 'testFile.js'
            }
        ]);
    });

    it('gitFileContent() - Возвращает содержимое файла тестового репозитория', async function () {
         const fileHash = '818b46f5a3570484c229ae09f2cd76ac8c0e1d36';

         const fileContent = await git.gitFileContent(fileHash);

         expect(fileContent).to.equal('text\nchange1\n');
    });
});
