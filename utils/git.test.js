const { myGit } = require('./git')

describe('Git History performance', () => {
    it('Git History is returning the correct history of commits', async () => {
        const mygit = new myGit()
        const page = 1
        const size = 10
        const gitCommandInputStub =
            '1e0156cb72fd07a3b7da80a14680b1e5b31bdd02\tHope R\t2018-10-18 16:36:56 +0300\tSet up test file with a test function\ndf248263322a497915566dab32fad0729f7d76db\tHope R\t2018-10-18 16:36:36 +0300\tMove functions to a class\n3e0cf248bd6cb28bcd0a91777c0d4c1560380715\tHope R\t2018-10-18 16:36:09 +0300\tSet up Jest'
        const resultStub = [
            {
                hash: '1e0156cb72fd07a3b7da80a14680b1e5b31bdd02',
                author: 'Hope R',
                timestamp: '2018-10-18 16:36:56 +0300',
                msg: 'Set up test file with a test function'
            },
            {
                hash: 'df248263322a497915566dab32fad0729f7d76db',
                author: 'Hope R',
                timestamp: '2018-10-18 16:36:36 +0300',
                msg: 'Move functions to a class'
            },
            {
                hash: '3e0cf248bd6cb28bcd0a91777c0d4c1560380715',
                author: 'Hope R',
                timestamp: '2018-10-18 16:36:09 +0300',
                msg: 'Set up Jest'
            }
        ]

        mygit.executeGit = () => {
            return Promise.resolve(gitCommandInputStub)
        }

        const checkGitHistory = await mygit.gitHistory(page, size)

        expect(checkGitHistory).toEqual(resultStub)
    })
})
