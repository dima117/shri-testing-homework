const assert = require('assert')
const chai = require('chai')
const { expect } = chai

const { gitHistory, gitFileTree, gitFileContent } = require('../utils/git')

const stabFileTree = () => Promise.resolve(`040000 tree 6a033b657f10911ad9b65c27c3f9b6fb6130b058	public \n\n`)
const stabHistory = () => Promise.resolve(`38429bed94bd7c107c65fed6bffbf443ff0f4183	Dmitry Andriyanov	2018-10-15 13:22:09 +0300	заготовка приложения\n`)

describe('functions from utils/git.js', () => {

  describe('gitHistory', () => {

    it('должен вернуть промис', () => {
      expect(gitHistory(1, 1, stabHistory)).to.be.a('promise')
    })

    it('промис должен вернуть массив', async () => {
      const result = await gitHistory(1, 1, stabHistory)
      expect(result).to.be.a('array')
    })

    it('объекты массива должны иметь ключи hash, author, timestamp, msg', async () => {
      const result = await gitHistory(1, 1, stabHistory)
      expect(result[0]).to.have.all.keys('hash', 'author', 'timestamp', 'msg')
    })
  })

  describe('gitFileTree', () => {

    it('должен вернуть промис', () => {
      expect(gitFileTree(null, null, stabFileTree)).to.be.a('promise')
    })

    it('промис должен вернуть массив', async () => {
      const result = await gitFileTree(null, null, stabFileTree)
      expect(result).to.be.a('array')
    })

    it('в массиве не должно быть пустых строк', async () => {
      const result = await gitFileTree(null, null, stabFileTree)
      const filtred = result.filter(el => el === '')
      expect(filtred).to.be.empty
    })

    it('объекты массива должны иметь ключи type, hash, path', async () => {
      const result = await gitFileTree(null, null, stabFileTree)
      expect(result[0]).to.have.all.keys('type', 'hash', 'path')
    })

  })

})
