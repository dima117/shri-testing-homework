const { myGit, executeGit } = require('./git')

describe('Работа git-функционала', () => {
    it('Git File Tree возвращает массив файлов в выбранном коммите (по хэшу), в каждом из элементов есть тип, хэш и путь', async () => {
        const mygit = new myGit()
        const hash = '559f5451edf2ed5afa1f46021d24dabb6b4ebf9a'
        const expectedResult = [
            {
                type: 'blob',
                hash: 'b512c09d476623ff4bf8d0d63c29b784925dbdf8',
                path: '.gitignore'
            },
            {
                type: 'blob',
                hash: 'ead09676a936eb50ed700dad0d280d65c3df21d8',
                path: 'README.md'
            },
            {
                type: 'blob',
                hash: '70461d5f9009344d9933e889b0448aa3f18d83d9',
                path: 'app.js'
            },
            {
                type: 'tree',
                hash: '152db3caa8a0d01acc76abc9df36e6b432ad1e55',
                path: 'bin'
            },
            {
                type: 'tree',
                hash: '41ff7f3c0cf24a7c49263ce29de7a1875fcaddbf',
                path: 'controllers'
            },
            {
                type: 'blob',
                hash: '1ee976233679ecb9d60d82f5f0b2d40028446529',
                path: 'package-lock.json'
            },
            {
                type: 'blob',
                hash: '54a814dd2c2f6220666d03d826286b1e8b999c9b',
                path: 'package.json'
            },
            {
                type: 'tree',
                hash: '6a033b657f10911ad9b65c27c3f9b6fb6130b058',
                path: 'public'
            },
            {
                type: 'tree',
                hash: '5433f5e1bd7bf7bfefb0ab10b4ab653422c41dd0',
                path: 'utils'
            },
            {
                type: 'tree',
                hash: '4c0e80c9ffcda3ef1a11b2d8ecd552418dad68b5',
                path: 'views'
            }
        ]

        const actualResult = await mygit.gitFileTree(hash)

        expect(actualResult).toEqual(expectedResult)
    })

    it('Git File Content возвращает корректное содержимое файла в текстовом формате по хэшу коммита', async () => {
        const mygit = new myGit()
        const hash = 'd7b47df17ba8ea90f706bf9c92f9a7fc14579744'
        const expectedResult =
            "#!/usr/bin/env node\n\n/**\n * Module dependencies.\n */\n\nvar app = require('../app');\n"

        const actualResult = await mygit.gitFileContent(hash)

        expect(actualResult).toEqual(expectedResult)
    })

    it('Git History с size = 5 возвращает массив из пяти последних коммитов, содержащий предпоследний коммит, на первой странице (page)', async () => {
        const mygit = new myGit()
        const page = 1
        const size = 5
        const expectedCommit = {
            author: 'Hope R',
            hash: 'bdc7504f0b06c47bd5ce502aabfd7e52b808ccd1',
            msg: 'UPdate stubs',
            timestamp: '2018-10-27 13:03:15 +0300'
        }

        const actualResult = await mygit.gitHistory(page, size)

        // cодержит нужный коммит
        expect(actualResult).toContainEqual(expectedCommit)

        // включает пять коммитов
        expect(actualResult.length).toEqual(size)
    })
})

describe('Внутренняя работа Execute Git', () => {
    it('Execute Git вызывает действие с переданной командой(command) и аргументами(args)', async () => {
        const expectedResult = 'On branch'
        const command = 'git'
        const args = 'status'

        const actualResult = await executeGit(command, [args])

        expect(actualResult).toEqual(expect.stringContaining(expectedResult))
    })
})
