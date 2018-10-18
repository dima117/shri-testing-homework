const { myGit } = require('./git')

describe('Git File Tree performance', () => {
    it('Git File Tree returns the correct list of files for a selected commit', async () => {
        const mygit = new myGit()
        const hash = '559f5451edf2ed5afa1f46021d24dabb6b4ebf9a'
        const gitCommandInputStub =
            '100644 blob b512c09d476623ff4bf8d0d63c29b784925dbdf8\t.gitignore\n100644 blob ead09676a936eb50ed700dad0d280d65c3df21d8\tREADME.md\n100644 blob 70461d5f9009344d9933e889b0448aa3f18d83d9\tapp.js\n040000 tree 152db3caa8a0d01acc76abc9df36e6b432ad1e55\tbin\n040000 tree 41ff7f3c0cf24a7c49263ce29de7a1875fcaddbf\tcontrollers\n100644 blob 1ee976233679ecb9d60d82f5f0b2d40028446529\tpackage-lock.json\n100644 blob 54a814dd2c2f6220666d03d826286b1e8b999c9b\tpackage.json\n040000 tree 6a033b657f10911ad9b65c27c3f9b6fb6130b058\tpublic\n040000 tree 5433f5e1bd7bf7bfefb0ab10b4ab653422c41dd0\tutils\n040000 tree 4c0e80c9ffcda3ef1a11b2d8ecd552418dad68b5\tviews'
        const resultStub = [
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

        mygit.executeGit = () => {
            return Promise.resolve(gitCommandInputStub)
        }

        const checkGitFileTree = await mygit.gitFileTree(hash)

        expect(checkGitFileTree).toEqual(resultStub)
    })
})

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
