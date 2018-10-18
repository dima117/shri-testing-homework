const { myGit } = require('./git')

describe('Jest is working just fine', () => {
    it('It can add 1 to all numbers in the array', async () => {
        const mygit = new myGit()
        const numbers = [1, 2, 3, 4, 5]
        const result = [2, 3, 4, 5, 6]
        const checkAddOneToEach = await mygit.addOneToEach(numbers)
        expect(checkAddOneToEach).toEqual(result)
    })
})
