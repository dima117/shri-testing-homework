const assert = require('assert')
const chai = require('chai')
const sinon = require('sinon')
const { expect } = chai

const { gitHistory, gitFileTree, gitFileContent } = require('../utils/git')

describe('functions from utils/git.js', () => {

  describe('gitHistory', () => {
    const stub = sinon.stub()
    stub.returns(Promise.resolve(`3	D	1	a\n3	D	1	a\n3	D	1	a\n\n\n`))

    it('ключи объеков массива из промиса отфильтрованы от пустых значений', async () => {
      const result = await gitHistory(1, 1, stub)
      result.forEach(({ hash, author, timestamp, msg }) => {
        expect(hash).not.be.empty
        expect(author).not.be.empty
        expect(timestamp).not.be.empty
        expect(msg).not.be.empty
      })
    })

    it('в объектах массива из промиса должны быть ключи hash, author, timestamp, msg', async () => {
      const result = await gitHistory(1, 1, stub)
      expect(result[0]).to.have.all.keys('hash', 'author', 'timestamp', 'msg')
    })
  })

  describe('gitFileTree', () => {
    const stub = sinon.stub()
    stub.returns(Promise.resolve(`0 t 8	p\n0 t 8	p\n0 t 8	p\n\n\n`))

    it('ключи объеков массива из промиса отфильтрованы от пустых значений', async () => {
      const result = await gitFileTree(null, null, stub)
      result.forEach(({ hash, type}) => {
        expect(hash).not.be.empty
        expect(type).not.be.empty
      })
    })

    it('в объектах массива из промиса должны быть ключи type, hash, path', async () => {
      const result = await gitFileTree(null, null, stub)
      expect(result[0]).to.have.all.keys('type', 'hash', 'path')
    })
  })
})
